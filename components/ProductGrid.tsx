"use client";

import Link from "next/link";
import Image from "next/image";
import AddButton from "@/components/AddButton";
import { CombinedProductType, Product, ProductSchema } from "@/drizzle/schema";
import { z } from "zod";

export const revalidate = 0;

type ProductType = z.infer<typeof ProductSchema>;

export default function ProductGridTemplate({
  product,
  title,
}: {
  product: CombinedProductType[];
  title: string;
}) {
  return (
    <div className="bg-white py-6">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-y-10 mb-8">
          <div className="md:flex md:items-center md:justify-between mx-2">
            <h2
              id="favorites-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              {title}
            </h2>
            <a
              href="#"
              className="hidden text-sm font-medium text-dark-green-500 hover:text-dark-green-300 md:block"
            >
              Visa alla<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>

        <main>
          <section
            aria-labelledby="products-heading"
            className="overflow-hidden"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-2 sm:mx-1 md:grid-cols-3 lg:grid-cols-5">
              {product.map((item: CombinedProductType) => (
                <div
                  key={item.products.id}
                  className="p-2 group relative border-gray-200 border-1 m-2 md:p-3 rounded-lg"
                  style={{
                    boxShadow: " rgba(0, 0, 0, 0.04) 0px 3px 5px",
                  }}
                >
                  <div className="aspect-h-1 aspect-w-1 overflow-hidden">
                    <Link href={`/products/${item.products.id}`}>
                      <Image
                        src={item.products.image_path}
                        alt="Alt text"
                        width={300}
                        height={300}
                        className="h-full w-full object-contain object-center p-2"
                      />{" "}
                    </Link>
                  </div>
                  <div className="text-start p-2 lg:p-0">
                    <div className="mt-4 mb-1 flex flex-row justify-between">
                      <p className=" text-gray-500 text-xs truncate font-medium">
                        {item.categories?.name}
                      </p>
                      <p className=" text-gray-500 text-xs font-light truncate">
                        Kvar i lager:{" "}
                        <span className="text-gray-500 font-medium">
                          {item.products.stock > 100
                            ? "100+"
                            : item.products.stock}
                        </span>
                      </p>
                    </div>{" "}
                    <Link href={`/products/${item.products.id}`}>
                      <h3 className="text-sm font-medium text-gray-900 truncate hover:text-gray-400 transition-all ease-in-out">
                        {item.products.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-base font-semibold text-price-500 text-start">
                      {item.products.price} kr
                    </p>
                    <div>
                      <AddButton item={item.products} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
