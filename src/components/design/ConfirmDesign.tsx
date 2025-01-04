import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ConfirmDesignProps {
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
}

export const ConfirmDesign = ({ tshirtStyle, tshirtColor, tshirtGender }: ConfirmDesignProps) => {
  const { toast } = useToast();

  return (
    <Button className="w-full" onClick={() => {
      toast({
        title: "设计已确认",
        description: "您的设计已保存",
      });
    }}>
      <Check className="mr-2 h-4 w-4" />
      确认设计
    </Button>
  );
};