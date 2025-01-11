import { Card, CardContent } from "@/components/ui/card";

export const EmptyOrderState = () => {
  return (
    <Card>
      <CardContent className="py-8">
        <div className="text-center text-muted-foreground">
          暂无订单记录
        </div>
      </CardContent>
    </Card>
  );
};