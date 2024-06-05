"use client";

import { Avatar } from "@/components/reusables/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/reusables/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "@/components/reusables/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/reusables/sidebar";
import { SidebarLayout } from "@/components/reusables/sidebar-layout";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import { Order, OrderSchema } from "@/drizzle/schema";
import { z } from "zod";
import { formatter } from "@/utils/formatter";

function AccountDropdownMenu({
  anchor,
}: {
  anchor: "top start" | "bottom end";
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <SignOutButton>
        <DropdownItem href="/">
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Logga ut</DropdownLabel>
        </DropdownItem>
      </SignOutButton>
    </DropdownMenu>
  );
}

type OrderType = z.infer<typeof OrderSchema>;

export function AdminLayout({
  orders,
  children,
}: {
  orders: OrderType[];
  children: React.ReactNode;
}) {
  let pathname = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src={user.imageUrl} square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/food.png" />
                <SidebarLabel>Hakims CMS</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/">
                  <BuildingStorefrontIcon />
                  <DropdownLabel>Hakims Livs</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/admin" current={pathname === "/admin"}>
                <HomeIcon />
                <SidebarLabel>Hem</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/orders"
                current={pathname === "/admin/orders"}
              >
                <ShoppingCartIcon />
                <SidebarLabel>Ordrar</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/add"
                current={pathname.startsWith("/admin/add")}
              >
                <PlusCircleIcon />
                <SidebarLabel>Lägg till produkt</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/products"
                current={pathname.startsWith("/admin/products")}
              >
                <PencilSquareIcon />
                <SidebarLabel>Produkthantering</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Senaste ordrar</SidebarHeading>
              {orders.map((order) => (
                <SidebarItem
                  className="truncate"
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                >
                  {`# ${order.id}`}

                  <div className="text-xs/6  text-zinc-600">|</div>
                  <div className="text-xs/6  text-zinc-600">{order.status}</div>
                  <div className="text-xs/6 ms-auto text-zinc-600 truncate">
                    {formatter.format(order.totalPrice)}
                  </div>
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="/">
                <BuildingStorefrontIcon />
                <SidebarLabel>Gå till butiken</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src={user.imageUrl}
                    className="size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {user.fullName}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {user.emailAddresses[0].emailAddress}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
