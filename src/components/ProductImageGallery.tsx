"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  images: string[];
  alt: string;
  className?: string;
};

export function ProductImageGallery({ images, alt, className = "" }: Props) {
  const slides = images.length > 0 ? images : ["/featured-picks-v3.png"];
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollStrip = useCallback((dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 88, behavior: "smooth" });
  }, []);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-zinc-200 bg-white">
        <Image
          src={slides[active] ?? slides[0]}
          alt={alt}
          fill
          className="object-contain object-center p-4"
          sizes="(max-width: 1024px) 100vw, 480px"
          priority
          unoptimized
        />
      </div>

      {slides.length > 1 ? (
        <div className="relative flex items-center gap-1">
          <button
            type="button"
            onClick={() => scrollStrip(-1)}
            className="flex h-16 w-8 shrink-0 items-center justify-center rounded-sm border border-zinc-200 bg-white text-zinc-500 transition hover:border-orange-400 hover:text-orange-500"
            aria-label="Previous thumbnails"
          >
            ‹
          </button>
          <div
            ref={stripRef}
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border-2 bg-white transition ${
                  active === i
                    ? "border-orange-500 ring-1 ring-orange-500/30"
                    : "border-zinc-200 hover:border-orange-300"
                }`}
                aria-label={`View image ${i + 1}`}
                aria-current={active === i}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-contain object-center p-1"
                  sizes="64px"
                  unoptimized
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollStrip(1)}
            className="flex h-16 w-8 shrink-0 items-center justify-center rounded-sm border border-zinc-200 bg-white text-zinc-500 transition hover:border-orange-400 hover:text-orange-500"
            aria-label="Next thumbnails"
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}
