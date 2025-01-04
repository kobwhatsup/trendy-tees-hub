import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Categories } from "@/components/home/Categories";
import { BrandStory } from "@/components/home/BrandStory";
import { AIDesigner } from "@/components/home/AIDesigner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <AIDesigner />
      <BrandStory />
    </div>
  );
};

export default Index;