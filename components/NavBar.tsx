"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Transition, Menu, Popover as UserPopover } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { SignOutButton } from "@clerk/nextjs";
import useCart from "@/stores/useCart";

const userNavigation = [{ name: "Logga ut", href: "#" }];

const navigation = [
  { name: "Kategorier", href: "/categories" },
  { name: "Varukorg", href: "/varukorg" },
  { name: "Admin", href: "/admin" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { totalItems } = useCart();
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  useEffect(() => {
    setTotalItemsCount(totalItems);
  }, [totalItems]);

  return (
    <header className="top-0 bg-white sticky z-50">
      <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative border-b border-gray-200 px-4 pb-14 sm:static sm:px-0 sm:pb-0">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 me-5">
              <Image
                src="/logo.png"
                width={150}
                height={150}
                alt="Store logo"
              />
            </Link>

            <div className="absolute inset-x-0 bottom-0 overflow-x-auto border-t sm:static sm:border-t-0">
              <div className="flex h-14 items-center space-x-8 px-4 sm:h-auto">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="border-r-1 pe-7 text-sm font-medium text-gray-700 hover:text-gray-800 hover:blur-[1px] ease-in-out duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end">
              <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </a>

              <div className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                <Link
                  href="/varukorg"
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingCartIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {totalItems > 10 ? "10+" : totalItems}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
              <UserPopover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                <UserPopover.Button className="group -m-2 flex items-center p-2">
                  <UserIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Open user menu</span>
                </UserPopover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <UserPopover.Panel className="absolute inset-x-0 top-16 mt-px bg-white shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-40 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">User Menu</h2>
                    <ul role="list" className="divide-y divide-gray-200">
                      {userNavigation.map((item) => (
                        <li key={item.name} className="flex items-center py-6">
                          <div className="ml-4 flex-auto">
                            <h3 className="font-medium text-gray-900">
                              <div className="hover:opacity-60">
                                <SignOutButton>Logga ut</SignOutButton>
                              </div>
                            </h3>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </UserPopover.Panel>
                </Transition>
              </UserPopover>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
