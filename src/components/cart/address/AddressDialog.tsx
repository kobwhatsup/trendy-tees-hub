import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { AddressList } from "./AddressList";
import { AddressForm } from "./AddressForm";
import { AddressType } from "./types";

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressSelect: (address: string) => void;
}

export const AddressDialog = ({ open, onOpenChange, onAddressSelect }: AddressDialogProps) => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [newAddress, setNewAddress] = useState({
    recipient_name: "",
    phone: "",
    address: "",
  });

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from("shipping_addresses")
        .select("*")
        .order("is_default", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("获取地址失败:", error);
      toast({
        title: "获取地址失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!newAddress.recipient_name || !newAddress.phone || !newAddress.address) {
      toast({
        title: "请填写完整信息",
        description: "收货人、手机号和地址都是必填项",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("未登录用户");
      }

      const { data, error } = await supabase
        .from("shipping_addresses")
        .insert([
          {
            ...newAddress,
            user_id: user.id,
            is_default: addresses.length === 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "保存成功",
        description: "新地址已添加",
      });

      setNewAddress({
        recipient_name: "",
        phone: "",
        address: "",
      });
      setAdding(false);

      await fetchAddresses();

      if (addresses.length === 0 && data) {
        onAddressSelect(`${data.recipient_name} ${data.phone} ${data.address}`);
      }
    } catch (error) {
      console.error("保存地址失败:", error);
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSelectAddress = (address: AddressType) => {
    onAddressSelect(`${address.recipient_name} ${address.phone} ${address.address}`);
    onOpenChange(false);
  };

  const handleSetDefault = async (id: string) => {
    try {
      await supabase
        .from("shipping_addresses")
        .update({ is_default: false })
        .neq("id", id);

      const { error } = await supabase
        .from("shipping_addresses")
        .update({ is_default: true })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "设置成功",
        description: "已更新默认地址",
      });

      await fetchAddresses();
    } catch (error) {
      console.error("设置默认地址失败:", error);
      toast({
        title: "设置失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  // 修复这里的useEffect使用
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchAddresses();
    }
  }, [open]);

  const handleAddressFormChange = (field: string, value: string) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>收货地址管理</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <>
              {addresses.length > 0 && (
                <AddressList 
                  addresses={addresses}
                  onSelect={handleSelectAddress}
                  onSetDefault={handleSetDefault}
                />
              )}

              {adding ? (
                <AddressForm
                  newAddress={newAddress}
                  onChange={handleAddressFormChange}
                  onCancel={() => {
                    setAdding(false);
                    setNewAddress({
                      recipient_name: "",
                      phone: "",
                      address: "",
                    });
                  }}
                  onSave={handleSaveAddress}
                  saving={saving}
                />
              ) : (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setAdding(true)}
                >
                  添加新地址
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};