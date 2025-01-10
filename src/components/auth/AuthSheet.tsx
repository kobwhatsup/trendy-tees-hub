import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "./AuthForm";
import { AuthStateHandler } from "./AuthStateHandler";

export const AuthSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsOpen(false);
      }
    };

    checkSession();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <LogIn className="h-4 w-4 mr-2" />
          登录
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>登录/注册</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          <AuthStateHandler />
          <AuthForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};