import { getLatestOrders } from "@/queries/queries";
import { OrderSchema } from "@/drizzle/schema";
import { AdminLayout } from "./admin-layout";
import { auth, currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: {
    template: "Admin CMS",
    default: "Admin CMS",
  },
  description: "",
};

async function getUserData() {
  const { userId } = auth();
  const user = await currentUser();

  return {
    userId,
    user: user
      ? {
          firstName: user.firstName,
          primaryEmailAddress: user.emailAddresses[0],
          profileImageUrl: user.imageUrl,
        }
      : null,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawOrders = await getLatestOrders();
  const parsedOrders = rawOrders.map((order) => OrderSchema.parse(order));
  const userData = await getUserData();

  return (
    <div
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <AdminLayout orders={parsedOrders}>{children}</AdminLayout>
    </div>
  );
}
