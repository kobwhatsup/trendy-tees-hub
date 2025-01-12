import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LogisticsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    shipping_company: string;
    tracking_number: string;
    shipping_status: string;
  }) => void;
  initialData: {
    shipping_company: string;
    tracking_number: string;
    shipping_status: string;
  };
}

export const LogisticsDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: LogisticsDialogProps) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新物流信息</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shipping_company">物流公司</Label>
            <Input
              id="shipping_company"
              value={formData.shipping_company}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shipping_company: e.target.value,
                }))
              }
              placeholder="请输入物流公司"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tracking_number">物流单号</Label>
            <Input
              id="tracking_number"
              value={formData.tracking_number}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tracking_number: e.target.value,
                }))
              }
              placeholder="请输入物流单号"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shipping_status">物流状态</Label>
            <Input
              id="shipping_status"
              value={formData.shipping_status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shipping_status: e.target.value,
                }))
              }
              placeholder="请输入物流状态"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">确认</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};