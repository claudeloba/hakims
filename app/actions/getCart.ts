"use server";

import { db } from "@/drizzle/db";
import { Product } from "@/drizzle/schema";
import { inArray } from "drizzle-orm";

export const getCartDetails = async (itemIds: number[]) => {
  if (itemIds.length === 0) {
    return [];
  }

  const products = await db
    .select()
    .from(Product)
    .where(inArray(Product.id, itemIds));

  return products;
};
