import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TShirtPreview } from "./TShirtPreview";

interface TShirtColorPreviewProps {
  designImage: string;
}

export const TShirtColorPreview = ({ designImage }: TShirtColorPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>T恤效果</CardTitle>
        <CardDescription>
          查看设计在不同颜色T恤上的效果
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="white" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="white">白色</TabsTrigger>
            <TabsTrigger value="black">黑色</TabsTrigger>
            <TabsTrigger value="navy">藏青</TabsTrigger>
            <TabsTrigger value="gray">灰色</TabsTrigger>
          </TabsList>
          <TabsContent value="white">
            <TShirtPreview color="#ffffff" designImage={designImage} />
          </TabsContent>
          <TabsContent value="black">
            <TShirtPreview color="#000000" designImage={designImage} />
          </TabsContent>
          <TabsContent value="navy">
            <TShirtPreview color="#1B365D" designImage={designImage} />
          </TabsContent>
          <TabsContent value="gray">
            <TShirtPreview color="#808080" designImage={designImage} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};