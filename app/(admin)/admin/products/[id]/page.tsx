import { Badge } from "@/components/reusables/badge";
import { Heading, Subheading } from "@/components/reusables/heading";
import { Link } from "@/components/reusables/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/reusables/table";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "../../../../../queries/queries";
import Image from "next/image";
import { formatter } from "../../../../../utils/formatter";
import DeleteButton from "../../../../../components/DeleteButton";
import EditButton from "../../../../../components/EditButton";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  let [product] = await getProduct(parseInt(params.id));

  return {
    title: product?.products.name,
  };
}

export default async function Event({ params }: { params: { id: string } }) {
  let [product] = await getProduct(parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Produkter
        </Link>
      </div>
      <div className="mt-4 flex  items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <Image
              width={128}
              height={128}
              className="aspect-square rounded-lg shadow"
              src={product.products.image_path}
              alt={product.products.name}
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{product.products.name}</Heading>
              <Badge color={product.products.stock ? "lime" : "red"}>
                Lager: {product.products.stock}
              </Badge>
            </div>
            <div className=" mt-2 text-sm/6 text-zinc-500">
              {product.products.description}
            </div>
            <div className="text-xs/6 text-zinc-600">
              {formatter.format(product.products.price)}{" "}
              <span aria-hidden="true">·</span> {product.categories?.name}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <EditButton product={product} />
          <DeleteButton productId={product.products.id} />
        </div>
      </div>
      <Subheading className="mt-12">Senast beställt</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order #</TableHeader>
            <TableHeader>Datum</TableHeader>
            <TableHeader>Kund</TableHeader>
            <TableHeader className="text-right">Summa</TableHeader>
          </TableRow>
        </TableHead>
        {/* IMPLEMENTERA ATT SE ALLA ORDERS VARAN ÄR MED I */}
        {/*    <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              href={order.url}
              title={`Order #${order.id}`}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">
                {formatter.format(order.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </>
  );
}
