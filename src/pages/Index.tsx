import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="hero-section">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              定义你的风格
            </h1>
            <p className="text-xl text-white/90 mb-8">
              探索我们的2024春季新品系列
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white"
              onClick={() => navigate("/products")}
            >
              立即选购
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">热门系列</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="product-card rounded-lg overflow-hidden">
                <div className="aspect-square bg-muted" />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">经典款T恤</h3>
                  <p className="text-muted-foreground">¥199</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;