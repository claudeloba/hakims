"use server";

import { db } from "../../drizzle/db";
import { Order } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(id: number) {
  await db.update(Order).set({ status: "delivered" }).where(eq(Order.id, id));
  revalidatePath(`/admin/orders/${id}`);
  return { id, status: "delivered" };
}
