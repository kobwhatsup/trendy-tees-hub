export type PaymentRecord = {
  id: string;
  order_id: string;
  transaction_id: string | null;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export type PaymentRecordInsert = Omit<PaymentRecord, 'id' | 'created_at' | 'updated_at'>;
export type PaymentRecordUpdate = Partial<PaymentRecordInsert>;