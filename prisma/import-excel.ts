import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";
import * as path from "path";
import * as fs from "fs";

const prisma = new PrismaClient();

function normalize(s: string): string {
  return s.trim().toLowerCase()
    .replace(/\u011f|\u011e/g, "g")
    .replace(/\u00fc|\u00dc/g, "u")
    .replace(/\u015f|\u015e/g, "s")
    .replace(/\u0131|I/g, "i")
    .replace(/\u00f6|\u00d6/g, "o")
    .replace(/\u00e7|\u00c7/g, "c");
}

function toSlug(name: string): string {
  return normalize(name)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    + "-" + Date.now().toString(36).slice(-4)
    + Math.random().toString(36).slice(-3);
}

function parseVat(val: unknown): number {
  if (val === null || val === undefined || val === "") return 20;
  const n = parseFloat(String(val).replace(",", "."));
  return isNaN(n) ? 20 : n;
}

function detectCol(headers: string[], kws: string[]): string | null {
  for (const h of headers) {
    const n = normalize(h);
    if (kws.some((k) => n.includes(normalize(k)))) return h;
  }
  return null;
}

async function main() {
  const mode = process.argv.includes("--import") ? "import" : "preview";

  // Try Turkish filename variants
  const candidates = [
    "SATIS URUN LISTESI 2026.xlsx",
    "SATI\u015e \u00dcR\u00dcN L\u0130STES\u0130 2026.xlsx",
  ];
  let filePath = "";
  for (const c of candidates) {
    const p = path.resolve(process.cwd(), c);
    if (fs.existsSync(p)) { filePath = p; break; }
  }
  // Also scan current dir for any .xlsx
  if (!filePath) {
    const files = fs.readdirSync(process.cwd()).filter((f) => f.endsWith(".xlsx"));
    if (files.length > 0) filePath = path.resolve(process.cwd(), files[0]);
  }

  if (!filePath) {
    console.error("ERROR: No .xlsx file found in project root.");
    process.exit(1);
  }

  console.log("File: " + filePath);
  console.log("Mode: " + mode + "\n");

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

  if (rows.length === 0) { console.error("ERROR: Empty Excel"); process.exit(1); }

  const headers = Object.keys(rows[0]);
  console.log(rows.length + " rows | Columns: " + headers.join(" | ") + "\n");

  const nameCol = detectCol(headers, ["urun", "hizmet", "adi", "isim"]);
  const saleVatCol = detectCol(headers, ["satis kdv", "satis"]);
  const buyVatCol = detectCol(headers, ["alis kdv", "alis"]);

  console.log("Name col     : " + (nameCol ?? "NOT FOUND"));
  console.log("SaleVAT col  : " + (saleVatCol ?? "not found, default 20"));
  console.log("BuyVAT  col  : " + (buyVatCol ?? "not found, default 20") + "\n");

  if (!nameCol) { console.error("ERROR: Name column not detected."); process.exit(1); }

  console.log("First 5 rows:");
  rows.slice(0, 5).forEach((r, i) => {
    const vs = saleVatCol ? r[saleVatCol] : "20";
    const vb = buyVatCol ? r[buyVatCol] : "20";
    console.log("  " + (i + 1) + '. "' + r[nameCol] + '" | SaleVAT:' + vs + " | BuyVAT:" + vb);
  });

  if (mode === "preview") {
    console.log("\nPreview done. To import:\n  npx tsx prisma/import-excel.ts --import\n");
    return;
  }

  console.log("\nImporting...\n");

  let defaultCategoryId: string;
  const firstCat = await prisma.category.findFirst({ orderBy: { sortOrder: "asc" } });
  if (firstCat) {
    defaultCategoryId = firstCat.id;
  } else {
    const c = await prisma.category.create({ data: { name: "Genel", slug: "genel", isActive: true, sortOrder: 0 } });
    defaultCategoryId = c.id;
  }

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rawName = String(row[nameCol] || "").trim();
    if (!rawName) { skipped++; continue; }

    const vatRate = parseVat(saleVatCol ? row[saleVatCol] : 20);
    const purchaseVatRate = parseVat(buyVatCol ? row[buyVatCol] : 20);

    try {
      await prisma.product.create({
        data: {
          name: rawName,
          slug: toSlug(rawName),
          price: 0,
          stock: 0,
          images: "[]",
          vatRate,
          purchaseVatRate,
          categoryId: defaultCategoryId,
          isActive: false,
          isFeatured: false,
        },
      });
      created++;
      if (created % 50 === 0) process.stdout.write("  Added: " + created + "...\r");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Unique constraint")) {
        skipped++;
      } else {
        console.log("  ERROR row " + (i + 2) + ": " + rawName + " -> " + msg);
        errors++;
      }
    }
  }

  console.log("\nDone! Created:" + created + " | Skipped:" + skipped + " | Errors:" + errors);
  console.log("Products hidden (isActive=false). Add price/photo then activate in admin.\n");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
