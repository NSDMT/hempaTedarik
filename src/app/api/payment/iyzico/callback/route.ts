import { NextRequest, NextResponse } from "next/server";
import { retrieveCheckoutForm } from "@/lib/iyzico";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const token = body.get("token") as string;
    const status = body.get("status") as string;

    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/odeme?error=no_token`);
    }

    const result = await retrieveCheckoutForm(token);

    const payment = await prisma.payment.findFirst({
      where: { paymentId: token },
      include: { order: { include: { items: true } } },
    });

    if (!payment) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/odeme?error=not_found`);
    }

    if (status === "success" && result.paymentStatus === "SUCCESS") {
      if (payment.status === "SUCCESS") {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_SITE_URL}/siparis-tamamlandi?order=${payment.order.orderNumber}`
        );
      }

      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "SUCCESS", metadata: JSON.stringify(result) },
      });
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "CONFIRMED" },
      });

      for (const item of payment.order.items) {
        await prisma.product
          .update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          })
          .catch(console.error);
      }

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/siparis-tamamlandi?order=${payment.order.orderNumber}`
      );
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "CANCELLED" },
      });

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/odeme?error=payment_failed`);
    }
  } catch (error) {
    console.error("İyzico callback error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/odeme?error=server_error`);
  }
}
