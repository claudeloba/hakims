"use server";

import { db } from "@/drizzle/db";
import { Product, ProductCategory } from "@/drizzle/schema";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProductInsertSchema = z.object({
  name: z.string().min(3, "Name should have at least 3 characters"),
  description: z
    .string()
    .min(3, "Description should have at least 3 characters"),
  price: z.number().min(1, "Price should be at least 1"),
  stock: z.number().min(1, "Stock should be at least 1"),
  image_path: z
    .string()
    .url()
    .min(3, "Image path should have at least 3 characters"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const productData = {
    name: formData.get("name") as string,
    description: formData.get("beskrivning") as string,
    price: parseFloat(formData.get("pris") as string),
    stock: parseInt(formData.get("antal") as string, 10),
    image_path: formData.get("image") as string,
  };
  const categoryId = parseInt(formData.get("kategori") as string, 10);

  const result = ProductInsertSchema.safeParse(productData);

  if (!result.success) {
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  db.insert(Product).values({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    image_path: data.image_path,
  });

  const insertedProduct = await db.insert(Product).values(data).returning();

  if (insertedProduct.length > 0) {
    const productId = insertedProduct[0].id;
    await db.insert(ProductCategory).values({
      productId,
      categoryId,
    });
  }
  redirect("/admin/products");
}
