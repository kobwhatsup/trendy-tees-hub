import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { Categories } from "@/components/home/Categories";
import { BrandStory } from "@/components/home/BrandStory";
import { AIDesignStudio } from "@/components/design/AIDesignStudio";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AIDesignStudio />
      <Categories />
      <BrandStory />
    </div>
  );
};

export default Index;