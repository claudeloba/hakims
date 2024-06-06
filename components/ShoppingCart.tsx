"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/stores/useCartStore";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { getCartDetails } from "@/app/actions/getCart";
import { ProductSchema } from "@/drizzle/schema";
import { z } from "zod";
import AddButton from "./AddButton";

type ProductType = z.infer<typeof ProductSchema>;

interface ShoppingCartProps {
  initialCartDetails?: (ProductType & { quantity: number })[];
  initialTotalPrice?: number;
}

const ShoppingCart = ({
  initialCartDetails = [],
  initialTotalPrice = 0,
}: ShoppingCartProps) => {
  const { cart, getAllCartItems, removeFromCart, removeAllFromCart } =
    useCartStore();
  const [cartDetails, setCartDetails] =
    useState<(ProductType & { quantity: number })[]>(initialCartDetails);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartItems = getAllCartItems();
      const itemIds = cartItems.map((item) => item.id);
      if (itemIds.length > 0) {
        const products: ProductType[] = await getCartDetails(itemIds);
        const detailedCartItems = products.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          return {
            ...product,
            quantity: cartItem ? cartItem.quantity : 0,
          };
        });
        setCartDetails(detailedCartItems);
        const total = detailedCartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        setTotalPrice(total);
      }
    };

    fetchCartData();
  }, [getAllCartItems]);

  useEffect(() => {
    const total = cartDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotalPrice(total);
  }, [cartDetails]);

  const handleRemove = (id: number) => {
    removeFromCart(id);
    const updatedCart = cartDetails.filter((item) => item.id !== id);
    setCartDetails(updatedCart);
    const total = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotalPrice(total);
    localStorage.setItem(
      "cart-storage",
      JSON.stringify(updatedCart.map(({ id, quantity }) => ({ id, quantity }))),
    );
  };

  const handleRemoveAll = (id: number) => {
    removeAllFromCart(id);
    const updatedCart = cartDetails.filter((item) => item.id !== id);
    setCartDetails(updatedCart);
    const total = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotalPrice(total);
    localStorage.setItem(
      "cart-storage",
      JSON.stringify(updatedCart.map(({ id, quantity }) => ({ id, quantity }))),
    );
  };

  if (cartDetails.length === 0) {
    return <p>Din varukorg är tom.</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Din varukorg
        </h1>
        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Din varukorg
            </h2>
            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {cartDetails.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <Image
                      width={500}
                      height={500}
                      src={product.image_path}
                      alt="Product Image"
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <Link
                            href={`/products/${product.id}`}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product.name}
                          </Link>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">
                          {product.price * product.quantity} kr
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <p className="flex items-center space-x-2 text-sm text-gray-700">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                        <span>
                          {product.stock > 0 ? "I lager" : "Slut i lager"}
                        </span>
                      </p>
                      <div className="ml-4">
                        <Button
                          variant="bordered"
                          onClick={() => handleRemoveAll(product.id)}
                          className="text-sm font-medium text-dark-green-500 hover:text-dark-green-300"
                        >
                          <span>Ta bort vara</span>
                        </Button>
                        <AddButton item={product} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>
            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Kostnad
                  </dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    {totalPrice} kr
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">
                Frakt beräknas i kassan.
              </p>
            </div>
            <div className="mt-10">
              <Button
                type="submit"
                className="w-full rounded-md border border-transparent bg-dark-green-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-dark-green-300 focus:outline-none focus:ring-2 focus:ring-dark-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Gå till kassan
              </Button>
            </div>
            <div className="mt-6 text-center text-sm">
              <p>
                eller{" "}
                <a
                  href="/"
                  className="font-medium text-dark-green-500 hover:text-dark-green-300"
                >
                  Fortsätt handla <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCart;
