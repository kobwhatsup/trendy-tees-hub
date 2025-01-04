import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ConfirmDesignProps {
  tshirtStyle: string;
  tshirtColor: string;
}

export const ConfirmDesign = ({ tshirtStyle, tshirtColor }: ConfirmDesignProps) => {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>确认设计</CardTitle>
        <CardDescription>
          确认您的设计方案
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p><strong>款式：</strong>{tshirtStyle === 'short' ? '短袖' : '长袖'}</p>
          <p><strong>颜色：</strong>{tshirtColor}</p>
        </div>
        <Button className="w-full" onClick={() => {
          toast({
            title: "设计已确认",
            description: "您的设计已保存",
          });
        }}>
          <Check className="mr-2 h-4 w-4" />
          确认设计
        </Button>
      </CardContent>
    </Card>
  );
};