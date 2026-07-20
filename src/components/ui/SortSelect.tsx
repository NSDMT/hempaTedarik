"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({
  value,
  options,
}: {
  value: string;
  options: { value: string; label: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("siralama", e.target.value);
    params.delete("sayfa"); // sıralama değişince ilk sayfaya dön
    router.push("?" + params.toString());
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="border rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-orange-400"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
