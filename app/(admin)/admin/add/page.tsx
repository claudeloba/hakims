"use client";
import { Button } from "@/components/reusables/button";
import { Checkbox, CheckboxField } from "@/components/reusables/checkbox";
import { Divider } from "@/components/reusables/divider";
import { Label } from "@/components/reusables/fieldset";
import { Heading, Subheading } from "@/components/reusables/heading";
import { Input } from "@/components/reusables/input";
import { Select } from "@/components/reusables/select";
import { Text } from "@/components/reusables/text";
import { Textarea } from "@/components/reusables/textarea";
import type { Metadata } from "next";
import { Inventarie } from "./inventarie";
import { addProduct } from "@/app/actions/addProduct";
import SubmitButton from "@/components/SubmitButton";
import { useFormState } from "react-dom";

export default function Add() {
  const [error, action] = useFormState(addProduct, {});

  return (
    <form action={action} className="mx-auto max-w-4xl">
      <Heading>Lägg till ny produkt</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Titel</Subheading>
          <Text>Ge produkten en titel</Text>
        </div>
        <div>
          <Input
            aria-label="Ge produkten en titel"
            name="name"
            placeholder="Titel"
          />
          {error.name && (
            <div className="text-red-600 text-xs mt-2 -mb-4">{error.name}</div>
          )}
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Beskrivning</Subheading>
          <Text>Ge produkten en beskrivning</Text>
        </div>
        <div>
          <Textarea
            aria-label="produkt-beskrivning"
            name="beskrivning"
            placeholder="Beskrivning"
          />
          {error.description && (
            <div className="text-red-600 text-xs mt-2 -mb-4">
              {error.description}
            </div>
          )}
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Bild</Subheading>
          <Text>Ladda upp en href-länk</Text>
        </div>
        <div className="space-y-4">
          <Input
            aria-label="Image Path"
            name="image"
            placeholder="http://..."
          />
          {error.image_path && (
            <div className="text-red-600 text-xs mt-2 -mb-4">
              {error.image_path}
            </div>
          )}
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Inventarie</Subheading>
          <Text>Pris, kategori & lager antal</Text>
        </div>
        <Inventarie error={error} />
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="reset" plain href="/admin">
          Avbryt
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
