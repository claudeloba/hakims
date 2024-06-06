"use client";

import { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Button } from "@nextui-org/react";
import useCartStore from "@/stores/useCartStore";
import { ProductSchema } from "@/drizzle/schema";
import { z } from "zod";

type ProductType = z.infer<typeof ProductSchema>;

interface AddButtonProps {
  item: ProductType;
}

const AddButton = ({ item }: AddButtonProps) => {
  const { addToCart, removeFromCart, cart } = useCartStore();
  const [quantity, setQuantity] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setClicked(true);
    } else {
      setQuantity(0);
      setClicked(false);
    }
  }, [cart, item.id]);

  const handleIncrement = () => {
    addToCart(item.id);
    setQuantity(quantity + 1);
    setClicked(true);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      removeFromCart(item.id);
      setQuantity(quantity - 1);
    } else {
      removeFromCart(item.id);
      setClicked(false);
      setQuantity(0);
    }
  };

  return (
    <div className={`flex mt-2 ${clicked ? "justify-center" : "justify-end"} `}>
      <LayoutGroup>
        <motion.div
          layout
          className={`${
            clicked ? "w-11/12" : ""
          } flex items-center py-1 rounded gap-1 sm:gap-6 `}
          initial={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {!clicked ? (
            <Button
              variant="ghost"
              onClick={handleIncrement}
              className="w-full rounded-xl text-center text-gray-600 py-1 font-medium text-sm"
            >
              Lägg till
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                isIconOnly
                onClick={handleDecrement}
                disabled={quantity === 0}
                className="w-1/3 text-center rounded-xl"
              >
                -
              </Button>
              <div className="w-1/3 text-center font-semibold">{quantity}</div>
              <Button
                variant="ghost"
                isIconOnly
                onClick={handleIncrement}
                className="w-1/3 text-center rounded-xl"
              >
                +
              </Button>
            </>
          )}
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default AddButton;
