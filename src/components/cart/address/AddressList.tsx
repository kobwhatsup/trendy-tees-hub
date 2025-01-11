import { Button } from "@/components/ui/button";
import { AddressType } from "./types";

interface AddressListProps {
  addresses: AddressType[];
  onSelect: (address: AddressType) => void;
  onSetDefault: (id: string) => void;
}

export const AddressList = ({ addresses, onSelect, onSetDefault }: AddressListProps) => {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="flex flex-col space-y-2 p-4 border rounded-lg hover:border-primary cursor-pointer"
          onClick={() => onSelect(address)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">
                {address.recipient_name} {address.phone}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {address.address}
              </p>
            </div>
            {!address.is_default && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSetDefault(address.id);
                }}
              >
                设为默认
              </Button>
            )}
          </div>
          {address.is_default && (
            <div className="text-xs text-primary">默认地址</div>
          )}
        </div>
      ))}
    </div>
  );
};