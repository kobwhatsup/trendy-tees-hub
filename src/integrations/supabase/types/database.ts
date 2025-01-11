export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: CartItem;
        Insert: CartItemInsert;
        Update: CartItemUpdate;
      };
      design_drafts: {
        Row: DesignDraft;
        Insert: DesignDraftInsert;
        Update: DesignDraftUpdate;
      };
      products: {
        Row: Product;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
      product_categories: {
        Row: ProductCategory;
        Insert: ProductCategory;
        Update: Partial<ProductCategory>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at'>>;
      };
      orders: {
        Row: Order;
        Insert: OrderInsert;
        Update: OrderUpdate;
      };
      order_items: {
        Row: OrderItem;
        Insert: OrderItemInsert;
        Update: OrderItemUpdate;
      };
      payment_records: {
        Row: PaymentRecord;
        Insert: PaymentRecordInsert;
        Update: PaymentRecordUpdate;
      };
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      shipping_addresses: {
        Row: ShippingAddress;
        Insert: ShippingAddressInsert;
        Update: ShippingAddressUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status: OrderStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];