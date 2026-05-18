import Image from "next/image";

const FALLBACK = "/featured-picks-v3.png";

type Props = {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-14 w-14 rounded-lg",
  md: "h-[4.5rem] w-[4.5rem] rounded-xl",
  lg: "h-24 w-24 rounded-xl",
} as const;

const px = { sm: 56, md: 72, lg: 96 } as const;

export function ProductThumb({
  src,
  alt,
  size = "md",
  className = "",
}: Props) {
  const box = sizes[size];
  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-zinc-700/60 bg-zinc-950 shadow-inner shadow-black/20 ${box} ${className}`}
    >
      <Image
        src={src?.trim() || FALLBACK}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={`${px[size]}px`}
        unoptimized
      />
    </div>
  );
}
