import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AuthForm } from "./AuthForm";
import { AuthStateHandler } from "./AuthStateHandler";
import { Dispatch, SetStateAction } from "react";

interface AuthSheetProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const AuthSheet = ({ isOpen, onOpenChange }: AuthSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>登录</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>登录或注册</SheetTitle>
        </SheetHeader>
        <AuthStateHandler>
          <AuthForm />
        </AuthStateHandler>
      </SheetContent>
    </Sheet>
  );
};