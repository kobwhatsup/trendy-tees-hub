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
        Row: {
          created_at: string
          design_back: string | null
          design_front: string | null
          id: string
          preview_back: string | null
          preview_front: string | null
          quantity: number
          tshirt_color: string
          tshirt_gender: string
          tshirt_size: string
          tshirt_style: string
          user_id: string
        }
        Insert: {
          created_at?: string
          design_back?: string | null
          design_front?: string | null
          id?: string
          preview_back?: string | null
          preview_front?: string | null
          quantity?: number
          tshirt_color: string
          tshirt_gender: string
          tshirt_size?: string
          tshirt_style: string
          user_id: string
        }
        Update: {
          created_at?: string
          design_back?: string | null
          design_front?: string | null
          id?: string
          preview_back?: string | null
          preview_front?: string | null
          quantity?: number
          tshirt_color?: string
          tshirt_gender?: string
          tshirt_size?: string
          tshirt_style?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      design_drafts: {
        Row: {
          created_at: string
          description: string | null
          design_back: string | null
          design_front: string | null
          id: string
          is_deleted: boolean | null
          is_public: boolean | null
          preview_back: string | null
          preview_front: string | null
          prompt_back: string | null
          prompt_front: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          design_back?: string | null
          design_front?: string | null
          id?: string
          is_deleted?: boolean | null
          is_public?: boolean | null
          preview_back?: string | null
          preview_front?: string | null
          prompt_back?: string | null
          prompt_front?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          design_back?: string | null
          design_front?: string | null
          id?: string
          is_deleted?: boolean | null
          is_public?: boolean | null
          preview_back?: string | null
          preview_front?: string | null
          prompt_back?: string | null
          prompt_front?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      design_projects: {
        Row: {
          back_design_settings: Json | null
          created_at: string
          description: string | null
          design_back: string | null
          design_front: string | null
          front_design_settings: Json | null
          id: string
          is_public: boolean | null
          preview_back: string | null
          preview_front: string | null
          prompt_back: string | null
          prompt_front: string | null
          title: string | null
          tshirt_color: string
          tshirt_gender: string
          tshirt_material: string
          tshirt_size: string
          tshirt_style: string
          updated_at: string
          user_id: string
        }
        Insert: {
          back_design_settings?: Json | null
          created_at?: string
          description?: string | null
          design_back?: string | null
          design_front?: string | null
          front_design_settings?: Json | null
          id?: string
          is_public?: boolean | null
          preview_back?: string | null
          preview_front?: string | null
          prompt_back?: string | null
          prompt_front?: string | null
          title?: string | null
          tshirt_color: string
          tshirt_gender: string
          tshirt_material: string
          tshirt_size: string
          tshirt_style: string
          updated_at?: string
          user_id: string
        }
        Update: {
          back_design_settings?: Json | null
          created_at?: string
          description?: string | null
          design_back?: string | null
          design_front?: string | null
          front_design_settings?: Json | null
          id?: string
          is_public?: boolean | null
          preview_back?: string | null
          preview_front?: string | null
          prompt_back?: string | null
          prompt_front?: string | null
          title?: string | null
          tshirt_color?: string
          tshirt_gender?: string
          tshirt_material?: string
          tshirt_size?: string
          tshirt_style?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          category_id: string
          product_id: string
        }
        Insert: {
          category_id: string
          product_id: string
        }
        Update: {
          category_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          stock: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          stock?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          stock?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
