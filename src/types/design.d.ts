export interface DesignType {
  id: string;
  user_id: string;
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  prompt_front: string | null;
  prompt_back: string | null;
  created_at: string;
  is_public: boolean;
  title: string | null;
  description: string | null;
  is_deleted: boolean;
  reward_percentage: number;
  total_earnings: number;
  view_count: number;
  use_count: number;
  sales_amount: number;
}

export interface DesignSettings {
  scale: number;
  rotation: number;
  opacity: number;
  position: "front" | "back";
  offsetX: number;
  offsetY: number;
}