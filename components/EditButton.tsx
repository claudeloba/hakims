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

const EditButton = ({ product }: { product: any }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStock, setNewStock] = useState(product.products.stock);
  const router = useRouter();

  const handleUpdateStock = async () => {
    const result = await updateProductStock(product.products.id, newStock);
    if (result?.success) {
      router.refresh();
      setIsDialogOpen(false);
    } else {
      toast("Failed to update the product stock: " + result?.error);
    }
  };

  return (
    <>
      <Button outline onClick={() => setIsDialogOpen(true)}>
        Redigera
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Redigera Lagerstatus</DialogTitle>
        <DialogDescription>
          Ange det nya lagersaldot för {product.products.name}.
        </DialogDescription>
        <DialogBody>
          <Input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(parseInt(e.target.value, 10))}
          />
        </DialogBody>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Avbryt</Button>
          <Button onClick={handleUpdateStock} color="primary">
            Uppdatera
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditButton;
