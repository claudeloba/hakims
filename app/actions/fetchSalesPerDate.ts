"use server";

import { db } from "@/drizzle/db";
import { Order } from "@/drizzle/schema";
import { sql, desc } from "drizzle-orm";
import { addDays } from "date-fns";

const getDateRange = (period: string) => {
  const today = new Date();
  switch (period) {
    case "last_two":
      return addDays(today, -14);
    case "last_month":
      return addDays(today, -30);
    case "last_quarter":
      return addDays(today, -90);
    default:
      return addDays(today, -7);
  }
};

export const fetchSalesData = async (period: string) => {
  const startDate = getDateRange(period);

  const salesDataPromise = db
    .select({
      totalSales: sql`sum(${Order.totalPrice})`.mapWith(Number),
      orderCount: sql`count(${Order.id})`.mapWith(Number),
      averageTotalPrice: sql`avg(${Order.totalPrice})`.mapWith(Number),
    })
    .from(Order)
    .where(sql`${Order.createdAt} >= ${startDate}`);

  const ordersPromise = db
    .select()
    .from(Order)
    .where(sql`${Order.createdAt} >= ${startDate}`)
    .orderBy(desc(Order.createdAt));

  const [salesData, orders] = await Promise.all([
    salesDataPromise,
    ordersPromise,
  ]);

  return {
    totalSales: salesData[0]?.totalSales || 0,
    orderCount: salesData[0]?.orderCount || 0,
    averageTotalPrice: salesData[0]?.averageTotalPrice || 0,
    orders,
  };
};
