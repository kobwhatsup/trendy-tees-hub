import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AddressList } from "../AddressList";
import { AddressForm } from "../AddressForm";
import { AddressType } from "../types";

interface AddressContentProps {
  loading: boolean;
  addresses: AddressType[];
  adding: boolean;
  newAddress: {
    recipient_name: string;
    phone: string;
    address: string;
  };
  onSelect: (address: AddressType) => void;
  onSetDefault: (id: string) => void;
  onAddNew: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (field: string, value: string) => void;
  saving: boolean;
}

export const AddressContent = ({
  loading,
  addresses,
  adding,
  newAddress,
  onSelect,
  onSetDefault,
  onAddNew,
  onCancel,
  onSave,
  onChange,
  saving,
}: AddressContentProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {addresses.length > 0 && (
        <AddressList
          addresses={addresses}
          onSelect={onSelect}
          onSetDefault={onSetDefault}
        />
      )}

      {adding ? (
        <AddressForm
          newAddress={newAddress}
          onChange={onChange}
          onCancel={onCancel}
          onSave={onSave}
          saving={saving}
        />
      ) : (
        <Button
          className="w-full"
          variant="outline"
          onClick={onAddNew}
        >
          添加新地址
        </Button>
      )}
    </div>
  );
};