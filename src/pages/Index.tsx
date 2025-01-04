import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { Categories } from "@/components/home/Categories";
import { BrandStory } from "@/components/home/BrandStory";
import { AIDesigner } from "@/components/home/AIDesigner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AIDesigner />
      <Categories />
      <BrandStory />
    </div>
  );
};

export default Index;