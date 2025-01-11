import { AuthCheck } from "./AuthCheck";
import { DesignsHeader } from "./DesignsHeader";
import { MyDesignsContent } from "./MyDesignsContent";

export const MyDesignsList = () => {
  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8 mt-16">
        <DesignsHeader />
        <MyDesignsContent />
      </div>
    </AuthCheck>
  );
};