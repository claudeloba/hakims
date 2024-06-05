"use client";

import { Button } from "@/components/reusables/button";
import { updateOrderStatus } from "@/app/actions/updateOrderStatus";
import { toast } from "react-hot-toast";
import { useFormStatus } from "react-dom";

export default function UpdateStatusButton({ id }: { id: number }) {
  const { pending } = useFormStatus();

  const handleClick = async () => {
    try {
      await updateOrderStatus(id);
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <Button onClick={handleClick} disabled={pending}>
      {pending ? "Updating..." : "Markera som levererad"}
    </Button>
  );
}
