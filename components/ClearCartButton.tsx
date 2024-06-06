"use client";
import { useState } from "react";
import { Button } from "./reusables/button";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from "@/components/reusables/dialog";
import { Input } from "./reusables/input";
import { updateProductStock } from "@/app/actions/updateProductStock";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useCart from "@/stores/useCart";

const ClearCartButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { removeAll } = useCart();
  const router = useRouter();

  return (
    <>
      <Button
        outline
        className="cursor-pointer transition group"
        onClick={() => setIsDialogOpen(true)}
      >
        <span className="text-sm font-medium text-dark-green-500 group-hover:text-dark-green-300 ">
          Rensa Varukorg
        </span>
      </Button>

      <Dialog
        className="bg-dark-green-500"
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <DialogTitle>Redigera Lagerstatus</DialogTitle>
        <DialogDescription>
          Är du säker på att du vill tömma varukorgen?
        </DialogDescription>
        <DialogActions>
          <Button
            color="white"
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(false)}
          >
            Avbryt
          </Button>
          <Button
            color="white"
            className="cursor-pointer"
            onClick={() => removeAll()}
          >
            Töm varukorgen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClearCartButton;
