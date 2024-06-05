"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/reusables/select";

export function SortDropdown() {
  const [sortBy, setSortBy] = useState("name");
  const router = useRouter();

  const handleChange = async (e: any) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    router.push(`/admin/products?sort_by=${sortValue}`);
  };

  return (
    <Select name="sort_by" value={sortBy} onChange={handleChange}>
      <option value="name">Sortera per namn</option>
      <option value="stock">Sortera per lagerstatus</option>
    </Select>
  );
}
