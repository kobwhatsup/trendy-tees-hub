export type CartItem = {
  id: string;
  user_id: string;
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  tshirt_style: string;
  tshirt_color: string;
  tshirt_gender: string;
  quantity: number;
  created_at: string;
}

export type CartItemInsert = Omit<CartItem, 'id' | 'created_at'>;
export type CartItemUpdate = Partial<CartItemInsert>;