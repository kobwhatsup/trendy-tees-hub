export type OrderStatus = 'pending_payment' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'refund_requested' | 'refunded' | 'payment_timeout';

export type Order = {
  id: string;
  user_id: string;
  order_number: string;
  total_amount: number;
  status: OrderStatus;
  shipping_address: string | null;
  recipient_name: string | null;
  recipient_phone: string | null;
  paid_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  shipping_company: string | null;
  tracking_number: string | null;
  shipping_status: string | null;
  is_deleted: boolean | null;
  created_at: string;
  updated_at: string;
}

export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at'>;
export type OrderUpdate = Partial<OrderInsert>;

export type OrderItem = {
  id: string;
  order_id: string;
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  tshirt_size: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export type OrderItemInsert = Omit<OrderItem, 'id' | 'created_at'>;
export type OrderItemUpdate = Partial<OrderItemInsert>;