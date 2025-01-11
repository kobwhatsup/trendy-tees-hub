import { OrderItems } from "../OrderItems";

interface OrderContentProps {
  items: any[];
  totalAmount: number;
}

export const OrderContent = ({ items, totalAmount }: OrderContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        <p className="font-medium">总金额: ¥{totalAmount.toFixed(2)}</p>
      </div>
      <OrderItems 
        items={items} 
        expanded={true}
        onToggle={() => {}}
      />
    </div>
  );
};