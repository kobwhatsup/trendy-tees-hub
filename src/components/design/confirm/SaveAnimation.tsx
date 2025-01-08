import { BookOpen, Shirt } from "lucide-react";
import { useState, useEffect } from "react";

export const SaveAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const playAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  useEffect(() => {
    (window as any).showSaveAnimation = playAnimation;
  }, []);

  if (!showAnimation) return null;

  return (
    <>
      <div className="fixed z-50 animate-save-to-designs">
        <BookOpen className="w-6 h-6 text-primary" />
      </div>
      <div className="fixed z-50 animate-save-to-cart">
        <Shirt className="w-6 h-6 text-primary" />
      </div>
    </>
  );
};