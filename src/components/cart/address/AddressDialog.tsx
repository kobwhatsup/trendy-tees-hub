import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddressHeader } from "./components/AddressHeader";
import { AddressContent } from "./components/AddressContent";
import { AddressType } from "./types";

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressSelect: (address: AddressType) => void;
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
        onAddressSelect(data);
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
    onAddressSelect(address);
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
        <AddressHeader />
        <AddressContent
          loading={loading}
          addresses={addresses}
          adding={adding}
          newAddress={newAddress}
          onSelect={handleSelectAddress}
          onSetDefault={handleSetDefault}
          onAddNew={() => setAdding(true)}
          onCancel={() => {
            setAdding(false);
            setNewAddress({
              recipient_name: "",
              phone: "",
              address: "",
            });
          }}
          onSave={handleSaveAddress}
          onChange={handleAddressFormChange}
          saving={saving}
        />
      </DialogContent>
    </Dialog>
  );
};