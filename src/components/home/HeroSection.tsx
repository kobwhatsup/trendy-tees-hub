import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="hero-section">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c]">
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center pt-16">
        <div className="max-w-3xl px-4 space-y-6">
          <h1 className="flex flex-col gap-2 text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="whitespace-nowrap">AI设计师</span>
            <span className="whitespace-nowrap">为你打造专属T恤</span>
          </h1>
          <div className="flex flex-col gap-2 text-xl text-white/90 mb-8 animate-fade-in">
            <p>输入你的创意灵感</p>
            <p>让AI为你设计独一无二的T恤</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white animate-fade-in text-lg px-8"
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