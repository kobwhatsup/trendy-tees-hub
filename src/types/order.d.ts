export interface OrderItem {
  id: string;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  tshirt_size: string;
  quantity: number;
  unit_price: number;
  preview_front?: string;
  preview_back?: string;
}

export interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
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