import { Avatar } from "@/components/reusables/avatar";
import { Button } from "@/components/reusables/button";
import { Heading } from "@/components/reusables/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/reusables/table";
import { getAllOrders } from "@/queries/queries";
import { formatter } from "@/utils/formatter";
import type { Metadata } from "next";
import { clerkClient } from "@clerk/nextjs/server";
import { fetchUserDetails } from "@/utils/fetchUserDetails";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Orders() {
  const orders = await getAllOrders();

  const ordersWithUserNames = await Promise.all(
    orders.map(async (order) => {
      const userDetails = await fetchUserDetails(order.userId);
      return {
        ...order,
        userName: userDetails
          ? `${userDetails.firstName} ${userDetails.lastName}`
          : "Anonym handlare",
      };
    }),
  );

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Ordrar</Heading>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order #</TableHeader>
            <TableHeader>Datum</TableHeader>
            <TableHeader>Kund</TableHeader>
            <TableHeader className="text-right">Summa</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersWithUserNames.map((order) => (
            <TableRow
              key={order.id}
              href={`/admin/orders/${order.id}`}
              title={`Order #${order.id}`}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">
                {order.createdAt?.toDateString()}
              </TableCell>
              <TableCell>{order.userName || "Anonym handlare"}</TableCell>
              <TableCell className="text-right">
                {formatter.format(order.totalPrice)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
