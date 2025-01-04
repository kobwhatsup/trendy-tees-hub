import { ShoppingCart, Menu, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text hover:opacity-80 transition-opacity">
              AI DESIGN TEE
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => navigate("/products")}>所有商品</Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/design")}
              className="flex items-center gap-2"
            >
              <Palette className="h-4 w-4" />
              AI设计
            </Button>
            <Button variant="ghost">新品上市</Button>
            <Button variant="ghost">热卖商品</Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}