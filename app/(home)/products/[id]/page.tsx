import { notFound } from "next/navigation";
import ProductOverview from "@/components/ProductOverview";
import { db } from "@/drizzle/db";
import { Product } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [product] = await db
    .select()
    .from(Product)
    .where(eq(Product.id, parseInt(id)));
  if (!product) {
    return notFound();
  }

  return <ProductOverview product={product} />;
}
