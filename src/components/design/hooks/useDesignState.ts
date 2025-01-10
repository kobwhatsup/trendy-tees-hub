import { useState } from "react";
import type { DesignSettings } from "@/types/design";

export const useDesignState = () => {
  const [frontPrompt, setFrontPrompt] = useState("");
  const [backPrompt, setBackPrompt] = useState("");
  const [tshirtStyle, setTshirtStyle] = useState("short");
  const [tshirtColor, setTshirtColor] = useState("white");
  const [tshirtGender, setTshirtGender] = useState("male");
  const [tshirtSize, setTshirtSize] = useState("M");
  const [tshirtMaterial, setTshirtMaterial] = useState("cotton");
  const [frontPreviewImage, setFrontPreviewImage] = useState<string>();
  const [backPreviewImage, setBackPreviewImage] = useState<string>();
  const [frontDesignSettings, setFrontDesignSettings] = useState<DesignSettings>({
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "front",
    offsetX: 0,
    offsetY: 30
  });
  const [backDesignSettings, setBackDesignSettings] = useState<DesignSettings>({
    scale: 0.8,
    rotation: 0,
    opacity: 1,
    position: "back",
    offsetX: 0,
    offsetY: 10
  });

  return {
    frontPrompt,
    setFrontPrompt,
    backPrompt,
    setBackPrompt,
    tshirtStyle,
    setTshirtStyle,
    tshirtColor,
    setTshirtColor,
    tshirtGender,
    setTshirtGender,
    tshirtSize,
    setTshirtSize,
    tshirtMaterial,
    setTshirtMaterial,
    frontPreviewImage,
    setFrontPreviewImage,
    backPreviewImage,
    setBackPreviewImage,
    frontDesignSettings,
    setFrontDesignSettings,
    backDesignSettings,
    setBackDesignSettings
  };
};