import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCheckoutForm } from "@/lib/iyzico";
import { generateOrderNumber } from "@/lib/utils";
import { sendOrderConfirmationSms } from "@/lib/netgsm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, address, payment, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Sepet boş" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= 500 ? 0 : 49.90;

    // Create order in DB
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: "PENDING",
        subtotal,
        shipping,
        tax: subtotal * 0.18,
        total,
        address: JSON.stringify(address),
        items: {
          create: items.map((item: { productId: string; name: string; price: number; quantity: number }) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    // İyzico Checkout Form
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    const checkoutRequest = {
      price: subtotal.toFixed(2),
      paidPrice: total.toFixed(2),
      currency: "TRY",
      installment: payment?.installment || "1",
      basketId: order.id,
      paymentChannel: "WEB",
      paymentGroup: "PRODUCT",
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/iyzico/callback`,
      buyer: {
        id: order.id,
        name: address.firstName,
        surname: address.lastName,
        email: address.email,
        identityNumber: "11111111111",
        registrationAddress: address.address,
        city: address.city,
        country: "Turkey",
        ip: ip.split(",")[0].trim(),
        gsmNumber: address.phone,
      },
      shippingAddress: {
        contactName: `${address.firstName} ${address.lastName}`,
        city: address.city,
        country: "Turkey",
        address: address.address,
      },
      billingAddress: {
        contactName: `${address.firstName} ${address.lastName}`,
        city: address.city,
        country: "Turkey",
        address: address.address,
      },
      basketItems: items.map((item: { productId: string; name: string; price: number; quantity: number }) => ({
        id: item.productId,
        name: item.name,
        category1: "Genel",
        itemType: "PHYSICAL",
        price: (item.price * item.quantity).toFixed(2),
      })),
    };

    const iyzicoResult = await createCheckoutForm(checkoutRequest);

    if (iyzicoResult.status !== "success") {
      // Delete the pending order
      await prisma.order.delete({ where: { id: order.id } }).catch(console.error);
      return NextResponse.json(
        { error: iyzicoResult.errorMessage || "Ödeme başlatılamadı" },
        { status: 400 }
      );
    }

    // Save payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: "iyzico",
        paymentId: iyzicoResult.token,
        status: "PENDING",
        amount: total,
        currency: "TRY",
      },
    });

    // Send SMS
    if (address?.phone) {
      sendOrderConfirmationSms(address.phone, orderNumber, total).catch(console.error);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber,
      paymentPageUrl: iyzicoResult.paymentPageUrl,
      token: iyzicoResult.token,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({ error: "Ödeme işlemi başarısız" }, { status: 500 });
  }
}
