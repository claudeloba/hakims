"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input, InputGroup } from "@/components/reusables/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearch(value);
    router.push(`/admin/products?search=${value}`);
  };

  return (
    <InputGroup>
      <MagnifyingGlassIcon />
      <Input
        name="search"
        placeholder="Sök efter produkt..."
        value={search}
        onChange={handleChange}
      />
    </InputGroup>
  );
}
