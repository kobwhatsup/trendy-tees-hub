import { Navbar } from "@/components/Navbar";
import { MyDesignsList } from "@/components/designs/MyDesignsList";

const MyDesigns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MyDesignsList />
    </div>
  );
};

export default MyDesigns;