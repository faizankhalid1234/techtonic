import { redirect } from "next/navigation";
import { findVariantById } from "@/lib/storeCatalog";

type PageProps = {
  params: Promise<{ variantId: string }>;
};

/** Product detail page removed — send shoppers back to the brand model list. */
export default async function StoreProductRedirect({ params }: PageProps) {
  const { variantId: raw } = await params;
  const hit = findVariantById(decodeURIComponent(raw));
  if (!hit) redirect("/store");
  redirect(`/store/${hit.line.category}`);
}
