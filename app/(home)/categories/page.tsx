"use client";

import { Avatar } from "@/components/reusables/avatar";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/components/reusables/navbar";
import { Sidebar } from "@/components/reusables/sidebar";
import { StackedLayout } from "@/components/reusables/stacked-layout";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

const NavBarMain = () => {
  return (
    <Navbar className="px-4">
      <NavbarLabel className="font-semibold text-xl">Hakims</NavbarLabel>
      <NavbarDivider
        className="mx-8
        "
      />
      <NavbarSection>
        <NavbarItem href="/" current>
          Home
        </NavbarItem>
        <NavbarItem href="/about">About</NavbarItem>
        <NavbarItem href="/contact">Contact</NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection>
        <Avatar src={"@/public/next.svg"} />
        <SignInButton />
        <SignUpButton />
      </NavbarSection>
    </Navbar>
  );
};
const categories = () => {
  return (
    <div>
      <StackedLayout navbar={<NavBarMain />} sidebar={<Sidebar />}>
        <div>Categories</div>
      </StackedLayout>
    </div>
  );
};

export default categories;
