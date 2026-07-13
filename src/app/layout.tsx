import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hempa Tedarik - İş Yerinizin Her İhtiyacı",
    template: "%s | Hempa Tedarik",
  },
  description:
    "Ofis kırtasiye, ev yaşam ve nalbur ürünleri için en iyi fiyatlar Hempa Tedarik'te. Hızlı teslimat, güvenli ödeme.",
  keywords: ["ofis malzemeleri", "kırtasiye", "temizlik ürünleri", "nalbur", "hempa tedarik"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Hempa Tedarik",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
