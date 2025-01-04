import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hero-section">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562157873-818bc0726f68')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            定义你的风格
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in">
            探索我们的2024春季新品系列
          </p>
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-white animate-fade-in"
            onClick={() => navigate("/products")}
          >
            立即选购
          </Button>
        </div>
      </div>
    </section>
  );
};