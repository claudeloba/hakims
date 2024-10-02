"use server";

import { db } from "@/drizzle/db";
import { Order, OrderItems } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";

type ProductWithQuantity = GlobalProductType & { quantity: number };

export async function createOrder(items: ProductWithQuantity[]) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const order = await db
    .insert(Order)
    .values({
      userId,
      totalPrice,
      status: "processing",
    })
    .returning({
      id: Order.id,
    });

  const orderId = order[0].id;

  const orderItemsData = items.map((item) => ({
    orderId,
    productId: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  await db.insert(OrderItems).values(orderItemsData);

  return orderId;
}
