import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { Categories } from "@/components/home/Categories";
import { BrandStory } from "@/components/home/BrandStory";
import { AIDesigner } from "@/components/home/AIDesigner";
import { FeaturedDesigns } from "@/components/home/FeaturedDesigns";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AIDesigner />
      <FeaturedDesigns />
      <Categories />
      <BrandStory />
    </div>
  );
};

export default Index;