import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AddressDialog } from "@/components/cart/address/AddressDialog";
import { AddressList } from "@/components/cart/address/AddressList";
import type { AddressType } from "@/components/cart/address/types";

export const UserAddresses = () => {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from("shipping_addresses")
        .select("*")
        .order("is_default", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
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
      await fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsDialogOpen(true)}>
        添加新地址
      </Button>

      {addresses.length > 0 ? (
        <AddressList
          addresses={addresses}
          onSelect={() => {}}
          onSetDefault={handleSetDefault}
        />
      ) : (
        <div className="text-center text-muted-foreground py-8">
          暂无收货地址
        </div>
      )}

      <AddressDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddressSelect={() => {
          setIsDialogOpen(false);
          fetchAddresses();
        }}
      />
    </div>
  );
};