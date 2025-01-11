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
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">基本信息</TabsTrigger>
            <TabsTrigger value="orders">我的订单</TabsTrigger>
            <TabsTrigger value="addresses">收货地址</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <UserInfo />
          </TabsContent>

          <TabsContent value="orders">
            <UserOrders />
          </TabsContent>

          <TabsContent value="addresses">
            <UserAddresses />
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  );
};

export default Profile;