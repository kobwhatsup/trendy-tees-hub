import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CartButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="ghost" 
      size="icon"
      className="relative"
      onClick={() => navigate("/cart")}
    >
      <ShoppingCart className="h-5 w-5" />
    </Button>
  );
};