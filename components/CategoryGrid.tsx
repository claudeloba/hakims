"use client";
import { Button } from "@/components/reusables/button";

const CategoryGrid = () => {
  return (
    <div className="my-8 flex flex-row flex-wrap justify-evenly gap-5 gap-x-4 mx-auto lg:w-9/12">
      <Button
        color="white"
        className="min-w-fit font-medium px-2 py-6 flex flex-row justify-start place-content-start  w-[155px] sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🏆</div>
        Deals
      </Button>
      <Button
        color="white"
        className="min-w-fit  font-medium px-2 py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🎁</div>
        Nyheter
      </Button>
      <Button
        color="white"
        className="min-w-fit  font-medium px-2 py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🍹</div>
        Dryck
      </Button>
      <Button
        color="white"
        className="min-w-fit  font-medium px-2 py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🍓</div>
        Frukt
      </Button>
      <Button
        color="white"
        className="min-w-fit font-medium px-2  py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🏃</div>
        Fitness
      </Button>
      <Button
        color="white"
        className="min-w-fit font-medium px-2  py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🥩</div>
        Kött
      </Button>
      <Button
        color="white"
        className="min-w-fit font-medium px-2  py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🐟</div>
        Fisk
      </Button>
      <Button
        color="white"
        className="min-w-fit font-medium px-2  py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🥫</div>
        Skafferi
      </Button>
      <Button
        color="white"
        className="min-w-fit font-medium px-2  py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🥕</div>
        Grönt
      </Button>
      <Button
        color="white"
        className="min-w-fit font-medium px-2  py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">💊</div>
        Apotek
      </Button>
      <Button
        color="white"
        className="min-w-fit font-medium px-2  py-6 flex flex-row justify-start place-content-start  w-[155px]  sm:w-[120px] sm:text-xs"
      >
        <div className="p-2 rounded-lg bg-white me-1">🐈</div>
        Husdjur
      </Button>
    </div>
  );
};

export default CategoryGrid;
