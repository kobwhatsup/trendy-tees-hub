import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">所有商品</h1>
          <div className="flex gap-4">
            <Button variant="outline">筛选</Button>
            <Button variant="outline">排序</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="product-card cursor-pointer"
              onClick={() => navigate(`/product/${i + 1}`)}
            >
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <h3 className="font-semibold mb-2">时尚印花T恤</h3>
              <p className="text-muted-foreground">¥199</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;