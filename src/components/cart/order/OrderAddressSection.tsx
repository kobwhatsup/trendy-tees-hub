import { AddressDialog } from "../address/AddressDialog";
import { AddressType } from "../address/types";

interface OrderAddressSectionProps {
  address: string;
  setShowAddressDialog: (show: boolean) => void;
  showAddressDialog: boolean;
  handleAddressSelect: (addressData: AddressType) => void;
}

export const OrderAddressSection = ({
  address,
  setShowAddressDialog,
  showAddressDialog,
  handleAddressSelect,
}: OrderAddressSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">收货地址</h3>
      <div 
        className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
        onClick={() => setShowAddressDialog(true)}
      >
        <p className="text-sm text-muted-foreground whitespace-pre-line">{address}</p>
      </div>
      <AddressDialog 
        open={showAddressDialog}
        onOpenChange={setShowAddressDialog}
        onAddressSelect={handleAddressSelect}
      />
    </div>
  );
};