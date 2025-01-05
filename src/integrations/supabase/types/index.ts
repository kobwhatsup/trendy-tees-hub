import type { CartItem, CartItemInsert, CartItemUpdate } from './cart';
import type { DesignDraft, DesignDraftInsert, DesignDraftUpdate } from './design';
import type { Product, ProductCategory, Category, ProductInsert, ProductUpdate } from './product';

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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];