"use server";

import { db } from "@/drizzle/db";
import { Product } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateProductStock = async (
  productId: number,
  newStock: number,
) => {
  try {
    await db
      .update(Product)
      .set({ stock: newStock })
      .where(eq(Product.id, productId));

    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
};
