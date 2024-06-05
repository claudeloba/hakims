"use client";

import { Input } from "@/components/reusables/input";
import {
  Listbox,
  ListboxLabel,
  ListboxOption,
} from "@/components/reusables/listbox";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/app/actions/fetchCategories";
import { Category, CategorySchema, OrderSchema } from "@/drizzle/schema";
import { z } from "zod";

export type CategoryType = typeof CategorySchema._type;

export function Inventarie({ error }: any) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
      setCategory(fetchedCategories[0]);
    }

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <Input
        min={0}
        type="number"
        aria-label="pris"
        name="pris"
        placeholder="Kostnad per enhet"
        className="col-span-2"
      />
      {error.price && (
        <div className="text-red-600 text-xs mt-2 -mb-4">{error.price}</div>
      )}
      <Input
        min={0}
        type="number"
        aria-label="antal"
        name="antal"
        placeholder="Antal i lager"
        className="col-span-2"
      />
      {error.stock && (
        <div className="text-red-600 text-xs mt-2 -mb-4">{error.stock}</div>
      )}
      <Listbox
        aria-label="Kategori"
        name="kategori"
        placeholder="Kategori"
        value={category}
        onChange={(category) => setCategory(category)}
        className="col-span-2"
      >
        {categories.map((category) => (
          <ListboxOption key={category.id} value={category.id}>
            <ListboxLabel>{category.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  );
}
