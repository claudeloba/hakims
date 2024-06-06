import {
  real,
  boolean,
  serial,
  text,
  pgSchema,
  timestamp,
  varchar,
  primaryKey,
  pgTable,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const Product = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  image_path: text("image_path").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const ProductSchema = createSelectSchema(Product);
export const ProductInsertSchema = createInsertSchema(Product);

export const productRelations = relations(Product, ({ many }) => ({
  orderItems: many(OrderItems),
  productCategories: many(ProductCategory),
}));

export const Category = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const CategorySchema = createSelectSchema(Category);
export const CategoryInsertSchema = createInsertSchema(Category);

export const categoryRelations = relations(Category, ({ many }) => ({
  productCategories: many(ProductCategory),
}));

export const ProductCategory = pgTable(
  "product_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => Product.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => Category.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.categoryId] }),
  }),
);

export const ProductCategorySchema = createSelectSchema(ProductCategory);
export const ProductCategoryInsertSchema = createInsertSchema(ProductCategory);

export const productCategoryRelations = relations(
  ProductCategory,
  ({ one }) => ({
    product: one(Product, {
      fields: [ProductCategory.productId],
      references: [Product.id],
    }),
    category: one(Category, {
      fields: [ProductCategory.categoryId],
      references: [Category.id],
    }),
  }),
);

export const CombinedProductSchema = z.object({
  products: ProductSchema,
  categories: CategorySchema.nullable(),
  product_categories: ProductCategorySchema.nullable(),
});

export type CombinedProductType = z.infer<typeof CombinedProductSchema>;
export type ProductType = z.infer<typeof ProductSchema>;

export const statusENUM = pgEnum("status", ["processing", "delivered"]);

export const Order = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  status: statusENUM("status").notNull(),
  totalPrice: real("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const OrderSchema = createSelectSchema(Order);

export const orderRelations = relations(Order, ({ many }) => ({
  orderItems: many(OrderItems),
}));

export const OrderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => Order.id, {
    onDelete: "cascade",
  }),
  productId: integer("product_id").references(() => Product.id, {
    onDelete: "restrict",
  }),
  quantity: integer("quantity").notNull(),
  price: real("price").notNull(),
});

export const OrderItemsSchema = createSelectSchema(OrderItems);

export const orderItemRelations = relations(OrderItems, ({ one }) => ({
  order: one(Order, {
    fields: [OrderItems.orderId],
    references: [Order.id],
  }),
  product: one(Product, {
    fields: [OrderItems.productId],
    references: [Product.id],
  }),
}));
