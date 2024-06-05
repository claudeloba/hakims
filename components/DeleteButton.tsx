"use client";

import { useRouter } from "next/navigation";
import { Button } from "./reusables/button";
import { deleteProduct } from "@/app/actions/deleteProduct";

const DeleteButton = ({ productId }: { productId: number }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteProduct(productId);
    if (result?.success) {
      router.push("/admin/products");
    } else {
      alert("Failed to delete the product: " + result?.error);
    }
  };

  return (
    <Button color="red" onClick={handleDelete}>
      Radera
    </Button>
  );
};

export default DeleteButton;
