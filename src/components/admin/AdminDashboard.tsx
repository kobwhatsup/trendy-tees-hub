import { Card } from "@/components/ui/card";

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">管理后台</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-2">今日订单</h3>
          <p className="text-2xl font-bold">-</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium mb-2">今日销售额</h3>
          <p className="text-2xl font-bold">¥-</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium mb-2">待处理订单</h3>
          <p className="text-2xl font-bold">-</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium mb-2">本月销售额</h3>
          <p className="text-2xl font-bold">¥-</p>
        </Card>
      </div>
    </div>
  );
};