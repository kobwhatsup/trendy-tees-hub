import { Navbar } from "@/components/Navbar";
import { AIDesignStudio } from "@/components/design/AIDesignStudio";

const Design = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AIDesignStudio />
    </div>
  );
};

export default Design;