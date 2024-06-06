import { Heading, Subheading } from "@/components/reusables/heading";
import Stat from "@/components/Stat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/reusables/table";
import { Badge } from "@/components/reusables/badge";
import { Divider } from "@/components/reusables/divider";
import { DateDropdown } from "@/components/DateDropdown";
import { formatter } from "@/utils/formatter";
import { fetchSalesData } from "@/app/actions/fetchSalesPerDate";
import { getAllOrders } from "@/queries/queries";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Sales({
  searchParams,
}: {
  searchParams: { period?: string };
}) {
  const period = searchParams.period || "last_week";
  const user = await currentUser();
  const { orders, totalSales, orderCount, averageTotalPrice } =
    await fetchSalesData(period);

  const formattedTotalSales = formatter.format(totalSales);
  const formattedAvgSales = formatter.format(averageTotalPrice);

  const hour = new Date().getHours();
  const greeting =
    hour >= 5 && hour < 11
      ? "God morgon"
      : hour >= 12 && hour < 17
        ? "God eftermiddag"
        : "God kväll";

  return (
    <>
      <Heading>{`${greeting}, ${user?.firstName ? user.firstName : "främling"}.`}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Överblick</Subheading>
        <div>
          <DateDropdown />
        </div>
      </div>
      <div className="mt-4 grid truncate gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total försäljning"
          value={formattedTotalSales}
          change="+4.5%"
        />
        <Stat title="Medelvärde" value={formattedAvgSales} change="-0.5%" />
        <Stat title="Antal beställningar" value={orderCount} change="+4.5%" />
      </div>
      <Subheading className="mt-14">Senaste beställningarna</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order #</TableHeader>
            <TableHeader>Datum</TableHeader>
            <TableHeader>Kund</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Summa</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              href={`/admin/orders/${order.id}`}
              title={`Order #${order.id}`}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">
                {order.createdAt?.toDateString()}
              </TableCell>
              <TableCell>{order.userId || "Anonym handlare"}</TableCell>
              <TableCell>
                <Badge color={order.status === "delivered" ? "lime" : "pink"}>
                  {order.status}
                </Badge>
              </TableCell>
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
