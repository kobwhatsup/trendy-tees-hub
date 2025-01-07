import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ConfirmDesignProps {
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  tshirtSize: string;
  frontDesignImage?: string;
  backDesignImage?: string;
  frontPreviewImage?: string;
  backPreviewImage?: string;
  onSave: () => void;
}

export const ConfirmDesign = ({
  onSave,
}: ConfirmDesignProps) => {
  return (
    <div className="flex justify-center">
      <Button 
        className="bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-lg px-8 py-4 h-auto text-lg rounded-full"
        onClick={onSave}
      >
        <Check className="mr-2 h-5 w-5" />
        保存设计方案
      </Button>
    </div>
  );
};