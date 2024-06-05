"use server";

import { db } from "@/drizzle/db";
import { Product, ProductCategory } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: number) => {
  try {
    await db
      .delete(ProductCategory)
      .where(eq(ProductCategory.productId, productId));

    await db.delete(Product).where(eq(Product.id, productId));

    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
};
