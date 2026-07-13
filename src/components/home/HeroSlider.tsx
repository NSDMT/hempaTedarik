"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaLink: string;
  bgColor: string;
  badge: string;
  highlight: string;
  image?: string;
}

interface BannerItem {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
  type: string;
  isActive: boolean;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "Ofisinizin Her İhtiyacı",
    subtitle: "Tek Adreste",
    description: "2.000'den fazla ürün, uygun fiyatlar ve hızlı teslimat ile iş yerinizi eksiksiz donatın.",
    cta: "Keşfet",
    ctaLink: "/urunler",
    bgColor: "from-orange-600 to-orange-400",
    badge: "Yeni Sezon",
    highlight: "%20'ye varan indirim",
  },
  {
    id: 2,
    title: "Temizlik & Hijyen",
    subtitle: "Ürünlerinde Büyük Fırsatlar",
    description: "İş yerinizin hijyen ihtiyaçlarını karşılayan geniş ürün yelpazemizi keşfedin.",
    cta: "Alışverişe Başla",
    ctaLink: "/kategori/temizlik-saglik",
    bgColor: "from-sky-600 to-sky-400",
    badge: "Kampanya",
    highlight: "500₺ üzeri ücretsiz kargo",
  },
  {
    id: 3,
    title: "Nalbur & Hırdavat",
    subtitle: "Profesyonel Ürünler",
    description: "El aletlerinden yapı malzemelerine geniş nalbur ürün yelpazemizle projelerinizi tamamlayın.",
    cta: "İncele",
    ctaLink: "/kategori/nalbur-hirdavat",
    bgColor: "from-slate-700 to-slate-500",
    badge: "Özel Fiyat",
    highlight: "Toplu alıma özel indirim",
  },
];

export default function HeroSlider() {
  const autoplay = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dbSlides, setDbSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadBanners = async () => {
      try {
        const res = await fetch("/api/banners", { cache: "no-store" });
        if (!res.ok) return;
        const banners: BannerItem[] = await res.json();
        const mapped = banners
          .filter((b) => b.isActive && b.type === "SLIDER")
          .map((b) => ({
            id: b.id,
            title: b.title,
            subtitle: b.subtitle || "Hempa Tedarik",
            description: b.subtitle || "İş yeriniz için avantajlı ürünleri hemen keşfedin.",
            cta: "İncele",
            ctaLink: b.link || "/urunler",
            bgColor: "from-orange-700 to-orange-500",
            badge: "Kampanya",
            highlight: "Hemen keşfet",
            image: b.image,
          }));

        if (isMounted) setDbSlides(mapped);
      } catch {
        // Keep static fallback slides on fetch failures.
      }
    };

    loadBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeSlides = dbSlides.length > 0 ? dbSlides : slides;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden rounded-2xl" ref={emblaRef}>
      <div className="flex">
        {activeSlides.map((slide) => (
          <div key={slide.id} className="flex-none w-full">
            <div className={`bg-gradient-to-r ${slide.bgColor} min-h-[340px] md:min-h-[420px] flex items-center relative overflow-hidden`}>
              {slide.image && (
                <>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45" />
                </>
              )}

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white/30 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-white/20 blur-2xl"></div>
              </div>

              {/* Decorative Circles */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-center">
                <div className="relative">
                  <div className="w-72 h-72 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-56 h-56 rounded-full bg-white/15 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-7xl">
                          {slide.id === 1 ? "📦" : slide.id === 2 ? "🧴" : "🔧"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mx-auto px-8 md:px-16 relative z-10">
                <div className="max-w-lg">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-white/30">
                    ✨ {slide.badge}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-1">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-3xl font-bold text-white/90 mb-3">
                    {slide.subtitle}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <Link
                      href={slide.ctaLink}
                      className="bg-white text-gray-800 hover:bg-gray-100 font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      {slide.cta} →
                    </Link>
                    <span className="text-white/90 text-sm font-medium bg-white/10 px-4 py-2 rounded-full border border-white/20">
                      🏷️ {slide.highlight}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`h-2 rounded-full transition-all ${idx === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
