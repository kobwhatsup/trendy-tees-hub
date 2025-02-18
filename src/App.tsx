import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Design from "./pages/Design";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Designs from "./pages/Designs";
import MyDesigns from "./pages/MyDesigns";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/design" element={<Design />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/my-designs" element={<MyDesigns />} />
      </Routes>
    </Router>
  );
}

export default App;