"use client";

import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
  activeIndex?: number;
};

/** Small multi-thumb strip for cart line items (panel photos). */
export function CartItemGallery({ images, alt, activeIndex = 0 }: Props) {
  const slides = images.length > 0 ? images : ["/featured-picks-v3.png"];
  const main = slides[activeIndex] ?? slides[0];

  return (
    <div className="flex shrink-0 flex-col gap-1.5">
      <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-800/80">
        <Image
          src={main}
          alt={alt}
          fill
          className="object-contain object-center p-1"
          sizes="72px"
          unoptimized
        />
      </div>
      {slides.length > 1 ? (
        <div className="flex gap-1">
          {slides.slice(0, 4).map((src, i) => (
            <div
              key={`${src}-${i}`}
              className={`relative h-7 w-7 overflow-hidden rounded-md border bg-zinc-800/80 ${
                i === activeIndex ? "border-amber-500" : "border-zinc-700"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain object-center p-0.5"
                sizes="28px"
                unoptimized
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
