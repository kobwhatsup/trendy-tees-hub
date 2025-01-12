export type Profile = {
  id: string;
  username: string | null;
  created_at: string;
}

export type ProfileInsert = Omit<Profile, 'created_at'>;
export type ProfileUpdate = Partial<Omit<ProfileInsert, 'id'>>;

export type ShippingAddress = {
  id: string;
  user_id: string;
  recipient_name: string;
  phone: string;
  address: string;
  is_default: boolean | null;
  created_at: string;
  updated_at: string;
}

export type ShippingAddressInsert = Omit<ShippingAddress, 'id' | 'created_at' | 'updated_at'>;
export type ShippingAddressUpdate = Partial<ShippingAddressInsert>;