import { useFormStatus } from "react-dom";
import { Button } from "./reusables/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="hover:opacity-75 cursor-pointer"
      disabled={pending}
      type="submit"
    >
      {pending ? "Sparar" : "Lägg till produkt"}
    </Button>
  );
};

export default SubmitButton;
