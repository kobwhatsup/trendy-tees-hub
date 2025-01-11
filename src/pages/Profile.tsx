import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserInfo } from "@/components/profile/UserInfo";
import { UserOrders } from "@/components/profile/UserOrders";
import { UserAddresses } from "@/components/profile/UserAddresses";
import { AuthCheck } from "@/components/designs/AuthCheck";

const Profile = () => {
  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold mb-8">个人中心</h1>
        
        {/* 基本信息部分 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">基本信息</h2>
          <UserInfo />
        </div>

        {/* 订单部分 - 直接显示 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">我的订单</h2>
          <UserOrders />
        </div>

        {/* 地址管理部分 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">收货地址</h2>
          <UserAddresses />
        </div>
      </div>
    </AuthCheck>
  );
};

export default Profile;