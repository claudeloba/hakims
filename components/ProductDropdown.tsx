"use client";

import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "./reusables/dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/actions/deleteProduct";
import { updateProductStock } from "@/app/actions/updateProductStock";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from "./reusables/dialog";
import { Button } from "./reusables/button";
import { Input } from "./reusables/input";

const ProductDropdown = ({ product }: any) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStock, setNewStock] = useState(product.products.stock);

  const handleDelete = async () => {
    const result = await deleteProduct(product.products.id);
    if (result?.success) {
      router.refresh();
    } else {
      alert("Failed to delete the product: " + result?.error);
    }
  };

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const handleUpdateStock = async () => {
    const result = await updateProductStock(product.products.id, newStock);
    if (result?.success) {
      router.refresh();
      setIsDialogOpen(false);
    } else {
      alert("Failed to update the product stock: " + result?.error);
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownButton plain aria-label="More options">
          <EllipsisVerticalIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end">
          <DropdownItem href={`/admin/products/${product.products.id}`}>
            Granska
          </DropdownItem>
          <DropdownItem onClick={handleEdit}>Redigera</DropdownItem>
          <DropdownItem onClick={handleDelete}>Radera</DropdownItem>
        </DropdownMenu>
      </Dropdown>

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

export default ProductDropdown;
