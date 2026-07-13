import axios from "axios";

const NETGSM_URL = "https://api.netgsm.com.tr/sms/send/get/";

interface SmsParams {
  to: string;
  message: string;
}

interface SmsResponse {
  success: boolean;
  message: string;
}

export async function sendSms({ to, message }: SmsParams): Promise<SmsResponse> {
  const usercode = process.env.NETGSM_USERCODE;
  const password = process.env.NETGSM_PASSWORD;
  const appname = process.env.NETGSM_APPNAME || "HEMPA";

  if (!usercode || !password) {
    console.warn("Netgsm credentials not configured");
    return { success: false, message: "SMS ayarları yapılandırılmamış" };
  }

  const phone = to.replace(/\D/g, "").replace(/^0/, "90");

  try {
    const response = await axios.get(NETGSM_URL, {
      params: {
        usercode,
        password,
        gsmno: phone,
        message,
        msgheader: appname,
      },
    });

    const result = response.data.toString();
    if (result.startsWith("00") || result.startsWith("01")) {
      return { success: true, message: "SMS gönderildi" };
    }

    return { success: false, message: `SMS hatası: ${result}` };
  } catch (error) {
    console.error("SMS gönderme hatası:", error);
    return { success: false, message: "SMS gönderilemedi" };
  }
}

export async function sendOrderConfirmationSms(
  phone: string,
  orderNumber: string,
  total: number
): Promise<SmsResponse> {
  const message = `Hempa Tedarik: ${orderNumber} numaralı siparişiniz alındı. Toplam: ${total.toFixed(2)} TL. Takip için: hempatedarik.com/siparislerim`;
  return sendSms({ to: phone, message });
}

export async function sendOrderShippedSms(
  phone: string,
  orderNumber: string,
  trackingCode?: string
): Promise<SmsResponse> {
  const trackingText = trackingCode ? ` Kargo takip no: ${trackingCode}` : "";
  const message = `Hempa Tedarik: ${orderNumber} numaralı siparişiniz kargoya verildi.${trackingText}`;
  return sendSms({ to: phone, message });
}
