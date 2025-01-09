import { HeroSection } from "@/components/home/HeroSection";
import { Categories } from "@/components/home/Categories";
import { AIDesigner } from "@/components/home/AIDesigner";
import { FeaturedDesigns } from "@/components/home/FeaturedDesigns";
import { BrandStory } from "@/components/home/BrandStory";

export default function Index() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <AIDesigner />
      <FeaturedDesigns />
      <BrandStory />
    </main>
  );
}