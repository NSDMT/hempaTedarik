import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendOrderShippedSms } from "@/lib/netgsm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        payment: true,
        user: { select: { name: true, email: true, phone: true } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({
      ...order,
      address: (() => { try { return JSON.parse(order.address); } catch { return {}; } })(),
    });
  } catch (error) {
    console.error("Order GET error:", error);
    return NextResponse.json({ error: "Sipariş alınamadı" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, trackingCode } = body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(trackingCode && { notes: trackingCode }),
      },
      include: { user: true },
    });

    // Send SMS when shipped
    if (status === "SHIPPED") {
      const address = (() => { try { return JSON.parse(order.address); } catch { return {}; } })();
      const phone = address?.phone || order.user?.phone;
      if (phone) {
        sendOrderShippedSms(phone, order.orderNumber, trackingCode).catch(console.error);
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order PUT error:", error);
    return NextResponse.json({ error: "Sipariş güncellenemedi" }, { status: 500 });
  }
}
