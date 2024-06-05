"use server";
import { db } from "@/drizzle/db";
import { Category, CategorySchema } from "@/drizzle/schema";

export const getAllCategories = async () => {
  const categories = await db.select().from(Category);
  return CategorySchema.array().parse(categories);
};
