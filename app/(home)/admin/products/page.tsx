import { Badge } from "@/components/reusables/badge";
import { Button } from "@/components/reusables/button";
import { Divider } from "@/components/reusables/divider";
import { Heading } from "@/components/reusables/heading";
import { Link } from "@/components/reusables/link";
import { formatter } from "@/utils/formatter";
import Image from "next/image";
import { getAllProducts } from "@/app/actions/sortProducts";
import { SortDropdown } from "@/components/Sort";
import { SearchInput } from "@/components/SearchInput";
import { Metadata } from "next";
import ProductDropdown from "@/components/ProductDropdown";

export const metadata: Metadata = {
  title: "Produkter",
};

export default async function Products({
  searchParams,
}: {
  searchParams: { sort_by?: string; search?: string };
}) {
  const orderBy = searchParams.sort_by || "name";
  const search = searchParams.search || "";
  const products = await getAllProducts(orderBy, search);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Produkter</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <SearchInput />
            </div>
            <div>
              <SortDropdown />
            </div>
          </div>
        </div>
        <Button href="/admin/add">Skapa produkt</Button>
      </div>
      <ul className="mt-10">
        {products.map((product, index) => (
          <>
            <li key={product.products.id}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={product.products.id} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    <Link
                      href={`/admin/products/${product.products.id}`}
                      aria-hidden="true"
                    >
                      <Image
                        width={128}
                        height={128}
                        className="aspect-square rounded-lg shadow"
                        src={product.products.image_path}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={`/admin/products/${product.products.id}`}>
                        {product.products.name}
                      </Link>
                    </div>
                    <div className="max-h-40 truncate max-w-40 lg:max-w-4xl pe-14 text-xs/6 text-zinc-500">
                      {product.products.description}{" "}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {formatter.format(product.products.price)}{" "}
                      <span aria-hidden="true">·</span>{" "}
                      {product.categories?.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className="max-sm:hidden text-nowrap"
                    color={product.products.stock ? "lime" : "red"}
                  >
                    {product.products.stock ? "I lager" : "Slut i lager"}
                  </Badge>
                  <ProductDropdown product={product} />
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
