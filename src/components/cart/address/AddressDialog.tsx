import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddressSelect: (address: string) => void;
}

export const AddressDialog = ({ open, onOpenChange, onAddressSelect }: AddressDialogProps) => {
  const [addresses, setAddresses] = useState<Array<{
    id: string;
    recipient_name: string;
    phone: string;
    address: string;
    is_default: boolean;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // 新地址表单数据
  const [newAddress, setNewAddress] = useState({
    recipient_name: "",
    phone: "",
    address: "",
  });

  // 获取用户地址列表
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

  // 保存新地址
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
      const { data, error } = await supabase
        .from("shipping_addresses")
        .insert([
          {
            ...newAddress,
            is_default: addresses.length === 0, // 如果是第一个地址，设为默认
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "保存成功",
        description: "新地址已添加",
      });

      // 重置表单
      setNewAddress({
        recipient_name: "",
        phone: "",
        address: "",
      });
      setAdding(false);

      // 刷新地址列表
      await fetchAddresses();

      // 如果是第一个地址，自动选中
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

  // 选择地址
  const handleSelectAddress = (address: typeof addresses[0]) => {
    onAddressSelect(`${address.recipient_name} ${address.phone} ${address.address}`);
    onOpenChange(false);
  };

  // 设为默认地址
  const handleSetDefault = async (id: string) => {
    try {
      // 先将所有地址的is_default设为false
      await supabase
        .from("shipping_addresses")
        .update({ is_default: false })
        .neq("id", id);

      // 将选中的地址设为默认
      const { error } = await supabase
        .from("shipping_addresses")
        .update({ is_default: true })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "设置成功",
        description: "已更新默认地址",
      });

      // 刷新地址列表
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

  // 组件加载时获取地址列表
  useState(() => {
    if (open) {
      fetchAddresses();
    }
  });

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
              {/* 地址列表 */}
              {addresses.length > 0 && (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex flex-col space-y-2 p-4 border rounded-lg hover:border-primary cursor-pointer"
                      onClick={() => handleSelectAddress(address)}
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
                              handleSetDefault(address.id);
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
              )}

              {/* 添加新地址表单 */}
              {adding ? (
                <div className="space-y-4 border rounded-lg p-4">
                  <Input
                    placeholder="收货人姓名"
                    value={newAddress.recipient_name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, recipient_name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="手机号码"
                    value={newAddress.phone}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, phone: e.target.value })
                    }
                  />
                  <Input
                    placeholder="详细地址"
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAdding(false);
                        setNewAddress({
                          recipient_name: "",
                          phone: "",
                          address: "",
                        });
                      }}
                    >
                      取消
                    </Button>
                    <Button onClick={handleSaveAddress} disabled={saving}>
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