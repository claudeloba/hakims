"use server";

import { db } from "@/drizzle/db";
import { Product, Category, ProductCategory } from "@/drizzle/schema";
import { sql, eq, ilike } from "drizzle-orm";

export const getAllProducts = async (
  orderBy: string = "name",
  search: string = "",
) => {
  let query = db
    .select()
    .from(Product)
    .leftJoin(ProductCategory, eq(Product.id, ProductCategory.productId))
    .leftJoin(Category, eq(ProductCategory.categoryId, Category.id))
    .orderBy(orderBy === "name" ? Product.name : Product.stock);

  if (search) {
    query = query.where(ilike(Product.name, `%${search}%`));
  }

  const products = await query;
  return products;
};
