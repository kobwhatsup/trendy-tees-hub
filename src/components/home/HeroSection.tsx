import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hero-section">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1684487747720-1ba29cda82f8')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            AI设计师为你打造专属T恤
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in">
            输入你的创意灵感，让AI为你设计独一无二的T恤
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white animate-fade-in text-lg px-8"
              onClick={() => navigate("/design")}
            >
              开始设计
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 animate-fade-in text-lg px-8"
              onClick={() => navigate("/products")}
            >
              浏览作品
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};