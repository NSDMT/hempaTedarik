"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Tag } from "lucide-react";

const cities = [
  "Adana", "Ankara", "Antalya", "Bursa", "Diyarbakır", "Eskişehir",
  "Gaziantep", "İstanbul", "İzmir", "Kayseri", "Konya", "Mersin",
  "Samsun", "Trabzon",
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const total = totalPrice();

  const [discountRate, setDiscountRate] = useState(0);
  useEffect(() => {
    fetch("/api/user/me").then((r) => r.json()).then((d) => setDiscountRate(d.discountRate ?? 0));
  }, []);

  const discountAmount = discountRate > 0 ? parseFloat((total * discountRate / 100).toFixed(2)) : 0;
  const discountedTotal = total - discountAmount;
  const shipping = discountedTotal >= 500 ? 0 : 49.90;
  const grandTotal = discountedTotal + shipping;

  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    notes: "",
  });

  const [payment, setPayment] = useState({
    cardHolder: "",
    cardNumber: "",
    expireMonth: "",
    expireYear: "",
    cvc: "",
    installment: "1",
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/payment/iyzico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          total: grandTotal,
          address,
          payment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        setStep("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert(data.error || "Ödeme işlemi başarısız. Lütfen tekrar deneyin.");
      }
    } catch {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 max-w-md w-full text-center shadow-sm border border-gray-100 mx-4">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Siparişiniz Alındı!</h1>
          <p className="text-gray-500 mb-2 text-sm">
            Sipariş onayı e-posta adresinize gönderildi.
          </p>
          <p className="text-gray-500 mb-8 text-sm">
            Kargo takip bilginiz SMS ile iletilecektir.
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push("/")} className="w-full">
              Ana Sayfaya Dön
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/hesabim/siparislerim")}
              className="w-full"
            >
              Siparişlerimi Görüntüle
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 text-sm text-gray-500">
          <span>Ana Sayfa</span> <span className="mx-2">›</span>
          <span>Sepetim</span> <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Ödeme</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { key: "address", label: "Adres Bilgileri", num: 1 },
            { key: "payment", label: "Ödeme", num: 2 },
          ].map((s, idx) => (
            <div key={s.key} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 ${step === s.key
                    ? "text-orange-500 font-semibold"
                    : step === "payment" && s.key === "address"
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === s.key
                      ? "bg-orange-500 text-white"
                      : step === "payment" && s.key === "address"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {step === "payment" && s.key === "address" ? "✓" : s.num}
                </div>
                <span className="text-sm hidden sm:block">{s.label}</span>
              </div>
              {idx === 0 && <div className="w-12 h-0.5 bg-gray-200 mx-1"></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "address" ? (
              <form onSubmit={handleAddressSubmit} className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-5">Teslimat Adresi</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Ad *</label>
                    <input
                      required
                      value={address.firstName}
                      onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Soyad *</label>
                    <input
                      required
                      value={address.lastName}
                      onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Telefon *</label>
                    <input
                      required
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">E-posta *</label>
                    <input
                      required
                      type="email"
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Adres *</label>
                    <textarea
                      required
                      rows={3}
                      value={address.address}
                      onChange={(e) => setAddress({ ...address, address: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 resize-none"
                      placeholder="Mahalle, sokak, bina no, daire"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Şehir *</label>
                    <select
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"
                    >
                      <option value="">Şehir seçin</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">İlçe *</label>
                    <input
                      required
                      value={address.district}
                      onChange={(e) => setAddress({ ...address, district: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="İlçe"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Posta Kodu</label>
                    <input
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="34000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Sipariş Notu</label>
                    <input
                      value={address.notes}
                      onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="İsteğe bağlı"
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full mt-6 rounded-xl">
                  Ödeme Adımına Geç →
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Kart Bilgileri</h2>
                <div className="flex items-center gap-2 mb-5 text-xs text-gray-500">
                  <Lock size={12} />
                  256-bit SSL ile şifrelenmiş güvenli bağlantı
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Kart Sahibinin Adı *</label>
                    <input
                      required
                      value={payment.cardHolder}
                      onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="Kart üzerindeki isim"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Kart Numarası *</label>
                    <input
                      required
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          cardNumber: e.target.value
                            .replace(/\D/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim()
                            .slice(0, 19),
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 font-mono tracking-wider"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Ay *</label>
                      <select
                        required
                        value={payment.expireMonth}
                        onChange={(e) => setPayment({ ...payment, expireMonth: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"
                      >
                        <option value="">Ay</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Yıl *</label>
                      <select
                        required
                        value={payment.expireYear}
                        onChange={(e) => setPayment({ ...payment, expireYear: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 bg-white"
                      >
                        <option value="">Yıl</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const y = new Date().getFullYear() + i;
                          return (
                            <option key={y} value={String(y)}>
                              {y}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">CVV *</label>
                      <input
                        required
                        type="password"
                        value={payment.cvc}
                        onChange={(e) => setPayment({ ...payment, cvc: e.target.value.slice(0, 3) })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 font-mono"
                        placeholder="***"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Taksit Seçeneği</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1", "3", "6", "9"].map((inst) => (
                        <button
                          key={inst}
                          type="button"
                          onClick={() => setPayment({ ...payment, installment: inst })}
                          className={`py-2 rounded-lg text-sm font-medium border transition-all ${payment.installment === inst
                              ? "border-orange-500 bg-orange-50 text-orange-600"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                        >
                          {inst === "1" ? "Tek Çekim" : `${inst} Taksit`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("address")}
                    className="flex-1 rounded-xl"
                  >
                    ← Geri
                  </Button>
                  <Button type="submit" disabled={loading} size="lg" className="flex-1 rounded-xl">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        İşleniyor...
                      </span>
                    ) : (
                      <>
                        <Lock size={16} />
                        {formatPrice(grandTotal)} Öde
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-32">
              <h2 className="text-base font-bold text-gray-800 mb-4">Sipariş Özeti</h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate flex-1 mr-2">
                      {item.name} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="mt-3 space-y-2 text-sm">
                {discountRate > 0 && (
                  <>
                    <div className="flex justify-between text-gray-500">
                      <span>Ürünler Toplamı</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-medium">
                      <span className="flex items-center gap-1">
                        <Tag size={13} /> Özel İndirim (%{discountRate})
                      </span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Toplam</span>
                  <span className="text-orange-500">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
