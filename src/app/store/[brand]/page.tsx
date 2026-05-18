import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  STORE_CATEGORIES,
  getCategoryById,
  getModelsForCategory,
  type StoreCategory,
} from "@/lib/storeCatalog";
import { BrandModelsClient } from "./BrandModelsClient";

type PageProps = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return STORE_CATEGORIES.map((c) => ({ brand: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const category = getCategoryById(brand);
  if (!category) return { title: "Shop | Tech Tonic" };
  return {
    title: `${category.label} displays | Tech Tonic`,
    description: `Browse ${category.label} replacement display models at Tech Tonic.`,
  };
}

export default async function BrandStorePage({ params }: PageProps) {
  const { brand } = await params;
  const category = getCategoryById(brand);
  if (!category) notFound();

  const models = getModelsForCategory(category.id as StoreCategory);

  return <BrandModelsClient category={category} models={models} />;
}
