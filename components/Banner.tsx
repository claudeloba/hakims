"use client";
import Link from "next/link";
import { Button } from "@/components/reusables/button";

export default function Banner() {
  return (
    <div className="bg-dark-green-500 rounded-2xl mx-6 md:mx-0">
      <div className="px-6 py-16 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-lg font-bold tracking-tight text-beige-500 sm:text-3xl">
            Vi firar vår nya webbshop 🎉
            <br />
            10% rabatt på din första order.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-md md:text-lg leading-8 text-beige-500">
            Registrera dig innan erbjudandet tar slut!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 flex-col sm:flex-row gap-y-6">
            <Button
              color="orange"
              href="/sign-up"
              className="text-sm font-semibold leading-6 text-beige-500"
            >
              Skapa konto <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
