import { NextRequest, NextResponse } from "next/server";
import { sendSms } from "@/lib/netgsm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, message } = body;

    if (!to || !message) {
      return NextResponse.json(
        { error: "Telefon numarası ve mesaj zorunludur" },
        { status: 400 }
      );
    }

    const result = await sendSms({ to, message });
    return NextResponse.json(result);
  } catch (error) {
    console.error("SMS route error:", error);
    return NextResponse.json({ error: "SMS gönderilemedi" }, { status: 500 });
  }
}
