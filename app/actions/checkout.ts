"use server";

import { stripe } from "@/utils/stripe";
import { db } from "@/drizzle/db";
import { Order, OrderItems } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";

type ProductWithQuantity = GlobalProductType & { quantity: number };
export async function createCheckoutSession(items: ProductWithQuantity[]) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        description: item.description,
        images: [item.image_path],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  return session.id;
}

export async function createOrder(items: ProductWithQuantity[]) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
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
