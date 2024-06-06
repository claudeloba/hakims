import { Badge } from "@/components/reusables/badge";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/reusables/description-list";
import { Divider } from "@/components/reusables/divider";
import { Heading, Subheading } from "@/components/reusables/heading";
import { Link } from "@/components/reusables/link";
import {
  BanknotesIcon,
  CalendarIcon,
  ChevronLeftIcon,
  CreditCardIcon,
} from "@heroicons/react/16/solid";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrder } from "../../../../../queries/queries";
import { formatter } from "../../../../../utils/formatter";
import UpdateStatusButton from "../../../../../components/UpdateStatusButton";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  let [order] = await getOrder(parseInt(params.id));

  return {
    title: order && `Order #${order.id}`,
  };
}

export default async function Order({ params }: { params: { id: string } }) {
  let [order] = await getOrder(parseInt(params.id));

  if (!order) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Ordrar
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Order #{order.id}</Heading>
          <Badge color={order.status === "delivered" ? "lime" : "purple"}>
            {order.status}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{formatter.format(order.totalPrice)}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                Mastercard
                <span>
                  <span aria-hidden="true">••••</span> 4242
                </span>
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.createdAt?.toDateString()}</span>
            </span>
          </div>
          <div className="flex gap-4">
            {order.status === "processing" ? (
              <UpdateStatusButton id={parseInt(params.id)} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Orderöversikt</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Kund</DescriptionTerm>
          <DescriptionDetails>
            {order.userId || "Anonym handlare"}
          </DescriptionDetails>
          <DescriptionTerm>Summa</DescriptionTerm>
          <DescriptionDetails>
            {formatter.format(order.totalPrice)}
          </DescriptionDetails>
        </DescriptionList>
      </div>
    </>
  );
}
