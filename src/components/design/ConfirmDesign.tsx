import React from "react";
import { SaveDesignButton } from "./confirm/SaveDesignButton";

interface ConfirmDesignProps {
  tshirtStyle: string;
  tshirtColor: string;
  tshirtGender: string;
  tshirtSize: string;
  frontDesignImage?: string;
  backDesignImage?: string;
  frontPreviewImage?: string;
  backPreviewImage?: string;
}

export const ConfirmDesign = (props: ConfirmDesignProps) => {
  return (
    <div className="flex justify-center">
      <SaveDesignButton {...props} />
    </div>
  );
};