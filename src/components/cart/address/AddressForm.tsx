import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface AddressFormProps {
  newAddress: {
    recipient_name: string;
    phone: string;
    address: string;
  };
  onChange: (field: string, value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
}

export const AddressForm = ({ 
  newAddress, 
  onChange, 
  onCancel, 
  onSave, 
  saving 
}: AddressFormProps) => {
  return (
    <div className="space-y-4 border rounded-lg p-4">
      <Input
        placeholder="收货人姓名"
        value={newAddress.recipient_name}
        onChange={(e) => onChange('recipient_name', e.target.value)}
      />
      <Input
        placeholder="手机号码"
        value={newAddress.phone}
        onChange={(e) => onChange('phone', e.target.value)}
      />
      <Input
        placeholder="详细地址"
        value={newAddress.address}
        onChange={(e) => onChange('address', e.target.value)}
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button onClick={onSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中
            </>
          ) : (
            "保存地址"
          )}
        </Button>
      </div>
    </div>
  );
};