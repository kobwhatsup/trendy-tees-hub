export type DesignDraft = {
  id: string;
  user_id: string;
  design_front: string | null;
  design_back: string | null;
  preview_front: string | null;
  preview_back: string | null;
  prompt_front: string | null;
  prompt_back: string | null;
  created_at: string;
  is_public: boolean | null;
  title: string | null;
  description: string | null;
}

export type DesignDraftInsert = Omit<DesignDraft, 'id' | 'created_at'>;
export type DesignDraftUpdate = Partial<DesignDraftInsert>;