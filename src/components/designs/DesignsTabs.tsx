import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesignsGrid } from "./DesignsGrid";

interface DesignsTabsProps {
  designs: any[];
}

export const DesignsTabs = ({ designs }: DesignsTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
        <TabsTrigger value="all">全部设计</TabsTrigger>
        <TabsTrigger value="public">已分享</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <DesignsGrid designs={designs || []} />
      </TabsContent>
      <TabsContent value="public">
        <DesignsGrid designs={designs?.filter(d => d.is_public) || []} />
      </TabsContent>
    </Tabs>
  );
};