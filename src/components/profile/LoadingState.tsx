import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex justify-center py-8">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
};