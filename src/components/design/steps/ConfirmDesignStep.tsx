import React from "react";
import { ConfirmDesign } from "../DesignConfirm";

interface ConfirmDesignStepProps {
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

export const ConfirmDesignStep = (props: ConfirmDesignStepProps) => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
        第五步 确认设计
      </h2>
      <ConfirmDesign {...props} />
    </section>
  );
};