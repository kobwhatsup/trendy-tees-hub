export type OrderStatus = 
  | "pending_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "refund_requested"
  | "refunded"
  | "payment_timeout";

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  shipping_address?: string;
  recipient_name?: string;
  recipient_phone?: string;
  paid_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  is_deleted?: boolean;
  shipping_company?: string;
  tracking_number?: string;
  shipping_status?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  design_front?: string;
  design_back?: string;
  preview_front?: string;
  preview_back?: string;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  tshirt_size: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at'>;
export type OrderUpdate = Partial<OrderInsert>;
export type OrderItemInsert = Omit<OrderItem, 'id' | 'created_at'>;
export type OrderItemUpdate = Partial<OrderItemInsert>;