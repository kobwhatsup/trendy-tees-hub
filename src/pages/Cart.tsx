import { Navbar } from "@/components/Navbar";

const Cart = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-4">购物车</h1>
        {/* 购物车内容将在后续实现 */}
      </div>
    </div>
  );
};

export default Cart;