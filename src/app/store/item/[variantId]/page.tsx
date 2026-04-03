import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  allVariantPathParams,
  findVariantById,
} from "@/lib/storeCatalog";
import { ProductDetailClient } from "./ProductDetailClient";

type PageProps = {
  params: Promise<{ variantId: string }>;
};

export function generateStaticParams() {
  return allVariantPathParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { variantId: raw } = await params;
  const hit = findVariantById(decodeURIComponent(raw));
  if (!hit) return { title: "Product | Tech Tonic" };
  const title = `${hit.variant.label} — ${hit.line.title} | Tech Tonic`;
  return {
    title,
    description: hit.line.detailDescription ?? hit.line.description,
  };
}

export default async function StoreProductPage({ params }: PageProps) {
  const { variantId: raw } = await params;
  const id = decodeURIComponent(raw);
  const hit = findVariantById(id);
  if (!hit) notFound();

  return <ProductDetailClient line={hit.line} variant={hit.variant} />;
}
