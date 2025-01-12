import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Design from "./pages/Design";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Designs from "./pages/Designs";
import MyDesigns from "./pages/MyDesigns";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/admin/Orders";

// 创建一个 QueryClient 实例
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;