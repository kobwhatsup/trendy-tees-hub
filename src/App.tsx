import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Index } from "@/pages/Index";
import { Design } from "@/pages/Design";
import { Cart } from "@/pages/Cart";
import { Products } from "@/pages/Products";
import { MyDesigns } from "@/pages/MyDesigns";
import { DesignsPage } from "@/pages/Designs";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/design" element={<Design />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/my-designs" element={<MyDesigns />} />
            <Route path="/designs" element={<DesignsPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;