import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartAnimation } from "./CartAnimation";
import { useCartCounter } from "./CartCounter";

export const CartButton = () => {
  const navigate = useNavigate();
  const itemCount = useCartCounter();
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon"
        className="relative"
        onClick={() => navigate("/cart")}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
      <CartAnimation />
    </div>
  );
};