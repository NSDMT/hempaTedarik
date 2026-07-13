"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Tag, X, ChevronDown, ChevronUp } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

interface Customer {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  discountRate: number;
  notes: string | null;
  createdAt: string;
  orderCount: number;
  totalSpent: number;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  // Discount edit modal state
  const [editModal, setEditModal] = useState<{ open: boolean; customer: Customer | null }>({
    open: false,
    customer: null,
  });
  const [discountInput, setDiscountInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?limit=50${search ? `&q=${search}` : ""}`);
      const data = await res.json();
      setCustomers(data.users || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(t);
  }, [fetchCustomers]);

  const openEdit = (c: Customer) => {
    setEditModal({ open: true, customer: c });
    setDiscountInput(String(c.discountRate));
    setNotesInput(c.notes || "");
    setSaveMsg("");
  };

  const handleSave = async () => {
    if (!editModal.customer) return;
    const rate = parseFloat(discountInput);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setSaveMsg("İndirim oranı 0–100 arasında olmalıdır.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${editModal.customer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discountRate: rate, notes: notesInput }),
      });
      if (!res.ok) { setSaveMsg("Kaydedilemedi."); return; }
      setSaveMsg("✓ Kaydedildi");
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editModal.customer!.id
            ? { ...c, discountRate: rate, notes: notesInput }
            : c
        )
      );
      setTimeout(() => setEditModal({ open: false, customer: null }), 700);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Müşteri Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-1">{total} kayıtlı müşteri</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Ad, e-posta veya telefon ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Yükleniyor...</div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Müşteri bulunamadı.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-left">
                  <th className="px-4 py-3 font-semibold">Müşteri</th>
                  <th className="px-4 py-3 font-semibold">Telefon</th>
                  <th className="px-4 py-3 font-semibold text-right">Sipariş</th>
                  <th className="px-4 py-3 font-semibold text-right">Toplam Harcama</th>
                  <th className="px-4 py-3 font-semibold text-center">İndirim</th>
                  <th className="px-4 py-3 font-semibold">Kayıt Tarihi</th>
                  <th className="px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.map((c) => (
                  <>
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{c.name || "—"}</p>
                        <p className="text-xs text-gray-400">{c.email}</p>
                        {c.notes && (
                          <p className="text-xs text-orange-500 mt-0.5">📝 {c.notes}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.phone || "—"}</td>
                      <td className="px-4 py-3 text-right font-medium">{c.orderCount}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800">
                        {formatPrice(c.totalSpent)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {c.discountRate > 0 ? (
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                            <Tag size={11} />
                            %{c.discountRate}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(c)}
                            className="text-xs bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
                          >
                            <Tag size={12} /> İndirim
                          </button>
                          <button
                            onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                            className="text-xs bg-gray-50 text-gray-500 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors"
                          >
                            {expanded === c.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === c.id && (
                      <tr key={`${c.id}-expanded`} className="bg-orange-50">
                        <td colSpan={7} className="px-6 py-3">
                          <p className="text-xs text-gray-500">
                            Sipariş geçmişi için müşteri detay sayfası yakında eklenecek.
                          </p>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Discount Modal */}
      {editModal.open && editModal.customer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-gray-800 text-lg">Özel İndirim Tanımla</h2>
                <p className="text-sm text-gray-500 mt-0.5">{editModal.customer.name || editModal.customer.email}</p>
              </div>
              <button onClick={() => setEditModal({ open: false, customer: null })} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İndirim Oranı (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="0"
                  />
                  <span className="text-gray-500 font-semibold">%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  0 girilirse indirim kaldırılır. Ödeme sırasında sepet toplamından düşülür.
                </p>

                {/* Quick presets */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[5, 10, 15, 20, 25].map((v) => (
                    <button
                      key={v}
                      onClick={() => setDiscountInput(String(v))}
                      className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                        discountInput === String(v)
                          ? "bg-orange-500 text-white border-orange-500"
                          : "border-gray-200 text-gray-600 hover:border-orange-300"
                      }`}
                    >
                      %{v}
                    </button>
                  ))}
                  <button
                    onClick={() => setDiscountInput("0")}
                    className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Kaldır
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notlar (isteğe bağlı)
                </label>
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  rows={2}
                  placeholder="VIP müşteri, kurumsal anlaşma vb."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>

              {saveMsg && (
                <p className={`text-sm font-medium ${saveMsg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>
                  {saveMsg}
                </p>
              )}
            </div>

            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setEditModal({ open: false, customer: null })}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-colors"
              >
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
