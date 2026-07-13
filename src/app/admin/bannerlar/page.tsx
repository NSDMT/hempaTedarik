"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Image, X, Eye, EyeOff } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
  type: string;
  isActive: boolean;
  sortOrder: number;
}

const EMPTY: Partial<Banner> = {
  title: "",
  subtitle: "",
  image: "",
  link: "",
  type: "SLIDER",
  isActive: true,
  sortOrder: 0,
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Banner | null }>({ open: false, editing: null });
  const [form, setForm] = useState<Partial<Banner>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchBanners = async () => {
    setLoading(true);
    const res = await fetch("/api/banners");
    const data = await res.json();
    setBanners(data);
    setLoading(false);
  };

  useEffect(() => { fetchBanners(); }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setModal({ open: true, editing: null });
  };

  const openEdit = (b: Banner) => {
    setForm({ ...b });
    setModal({ open: true, editing: b });
  };

  const closeModal = () => {
    setModal({ open: false, editing: null });
    setForm(EMPTY);
  };

  const handleSave = async () => {
    if (!form.title?.trim() || !form.image?.trim()) return alert("Başlık ve görsel URL zorunludur.");
    setSaving(true);
    const url = modal.editing ? `/api/banners/${modal.editing.id}` : "/api/banners";
    const method = modal.editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      await fetchBanners();
      closeModal();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Kaydedilemedi.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
    if (res.ok) setBanners((prev) => prev.filter((b) => b.id !== id));
    else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Banner silinemedi");
    }
    setDeleteId(null);
  };

  const toggleActive = async (b: Banner) => {
    const res = await fetch(`/api/banners/${b.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...b, isActive: !b.isActive }),
    });
    if (res.ok) {
      setBanners((prev) => prev.map((x) => x.id === b.id ? { ...x, isActive: !x.isActive } : x));
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Banner güncellenemedi");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-1">Slider ve reklam bannerlarını yönetin</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
        >
          <Plus size={18} /> Banner Ekle
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Yükleniyor...</div>
      ) : banners.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Image size={48} className="mx-auto mb-3 opacity-30" />
          <p>Henüz banner eklenmemiş</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {banners.map((b) => (
            <div key={b.id} className={`bg-white border rounded-2xl overflow-hidden flex items-stretch shadow-sm ${!b.isActive ? "opacity-60" : ""}`}>
              {/* Preview image */}
              <div className="w-48 flex-shrink-0 bg-gray-100 relative">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-product.jpg"; }}
                />
                <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full ${b.type === "SLIDER" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
                  }`}>
                  {b.type}
                </span>
              </div>

              <div className="flex-1 p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                  {b.subtitle && <p className="text-sm text-gray-500 mb-2">{b.subtitle}</p>}
                  {b.link && (
                    <p className="text-xs text-orange-500 truncate max-w-xs">{b.link}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Sıra: {b.sortOrder}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(b)}
                    title={b.isActive ? "Pasife al" : "Aktife al"}
                    className={`p-2 rounded-lg transition-colors ${b.isActive ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
                      }`}
                  >
                    {b.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => openEdit(b)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(b.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                {modal.editing ? "Banner Düzenle" : "Yeni Banner"}
              </h2>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
                <input
                  value={form.title || ""}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Banner başlığı"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                <input
                  value={form.subtitle || ""}
                  onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                  placeholder="İsteğe bağlı alt başlık"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL *</label>
                <input
                  value={form.image || ""}
                  onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  value={form.link || ""}
                  onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
                  placeholder="/urunler veya https://..."
                  className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tür</label>
                  <select
                    value={form.type || "SLIDER"}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                  >
                    <option value="SLIDER">Slider</option>
                    <option value="PROMO">Promo Banner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
                  <input
                    type="number"
                    value={form.sortOrder ?? 0}
                    onChange={(e) => setForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="banner-active"
                  checked={form.isActive ?? true}
                  onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
                  className="w-4 h-4 accent-orange-500"
                />
                <label htmlFor="banner-active" className="text-sm font-medium text-gray-700">Aktif</label>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-60 text-sm"
              >
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-bold text-gray-900 mb-2">Banneri Sil</h3>
            <p className="text-gray-500 text-sm mb-6">Bu banneri silmek istediğinize emin misiniz?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border rounded-xl text-gray-700 hover:bg-gray-50 text-sm font-medium">
                Vazgeç
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
