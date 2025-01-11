export interface Profile {
  id: string;
  username?: string;
  created_at: string;
}

export interface ShippingAddress {
  id: string;
  user_id: string;
  recipient_name: string;
  phone: string;
  address: string;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export type ProfileInsert = Omit<Profile, 'created_at'>;
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>;
export type ShippingAddressInsert = Omit<ShippingAddress, 'id' | 'created_at' | 'updated_at'>;
export type ShippingAddressUpdate = Partial<ShippingAddressInsert>;