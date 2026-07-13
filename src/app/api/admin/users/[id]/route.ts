import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, email: true, phone: true,
      discountRate: true, notes: true, createdAt: true,
      orders: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true, orderNumber: true, status: true,
          total: true, createdAt: true,
        },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const { discountRate, notes } = body;

  if (typeof discountRate !== "undefined" && (discountRate < 0 || discountRate > 100)) {
    return NextResponse.json({ error: "İndirim oranı 0–100 arasında olmalıdır" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(typeof discountRate !== "undefined" && { discountRate: parseFloat(discountRate) }),
      ...(typeof notes !== "undefined" && { notes }),
    },
    select: { id: true, discountRate: true, notes: true },
  });

  return NextResponse.json(user);
}
