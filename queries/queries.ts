import { db } from "@/drizzle/db";
import {
  Category,
  Order,
  Product,
  ProductCategory,
  User,
} from "@/drizzle/schema";
import { desc, eq, sum } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const getAllOrders = async (limit = 0, offset = 0) => {
  return await db
    .select()
    .from(Order)
    .leftJoin(User, eq(Order.userId, User.id))
    .orderBy(desc(Order.createdAt))
    .limit(limit)
    .offset(offset);
};

export const getOrder = async (id: number) => {
  return await db
    .select()
    .from(Order)
    .where(eq(Order.id, id))
    .leftJoin(User, eq(Order.userId, User.id));
};

export const getLatestOrders = async () => {
  return await db.select().from(Order).orderBy(desc(Order.createdAt)).limit(5);
};

export const getAllProducts = async (orderBy: "name" | "stock" = "name") => {
  return await db
    .select()
    .from(Product)
    .leftJoin(ProductCategory, eq(Product.id, ProductCategory.productId))
    .leftJoin(Category, eq(ProductCategory.categoryId, Category.id))
    .orderBy(orderBy === "name" ? Product.name : Product.stock);
};

export const getProduct = async (id: number) => {
  return await db
    .select()
    .from(Product)
    .where(eq(Product.id, id))
    .leftJoin(ProductCategory, eq(Product.id, ProductCategory.productId))
    .leftJoin(Category, eq(ProductCategory.categoryId, Category.id));
};

export const getAllCategories = async () => {
  return await db.select().from(Category);
};
