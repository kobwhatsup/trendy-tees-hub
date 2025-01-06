import { useState } from "react";
import { useDesignGeneration } from "./hooks/useDesignGeneration";
import { DesignDescription } from "./steps/DesignDescription";
import { DesignPreviewStep } from "./steps/DesignPreviewStep";
import { TShirtStyleStep } from "./steps/TShirtStyleStep";
import { TShirtEffectStep } from "./steps/TShirtEffectStep";
import { ConfirmDesignStep } from "./steps/ConfirmDesignStep";

export const AIDesignStudio = () => {
  const [frontPrompt, setFrontPrompt] = useState("");
  const [backPrompt, setBackPrompt] = useState("");
  const [tshirtStyle, setTshirtStyle] = useState("short");
  const [tshirtColor, setTshirtColor] = useState("white");
  const [tshirtGender, setTshirtGender] = useState("male");
  const [tshirtSize, setTshirtSize] = useState("M");
  const [tshirtMaterial, setTshirtMaterial] = useState("cotton");
  const [frontPreviewImage, setFrontPreviewImage] = useState<string>();
  const [backPreviewImage, setBackPreviewImage] = useState<string>();

  const {
    isGenerating,
    frontDesignImage,
    backDesignImage,
    generateDesign
  } = useDesignGeneration();

  const handleGenerate = (position: "front" | "back") => {
    const prompt = position === "front" ? frontPrompt : backPrompt;
    generateDesign(prompt, position);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0EA5E9] via-[#ea384c] to-[#0EA5E9] text-transparent bg-clip-text">
            AI设计师
          </h1>
          <p className="text-lg text-muted-foreground">
            描述你的创意想法，让AI为你打造独一无二的T恤设计
          </p>
        </div>

        <div className="space-y-12">
          <DesignDescription
            frontPrompt={frontPrompt}
            backPrompt={backPrompt}
            isGenerating={isGenerating}
            onFrontPromptChange={setFrontPrompt}
            onBackPromptChange={setBackPrompt}
            onGenerate={handleGenerate}
          />

          <DesignPreviewStep
            frontDesignImage={frontDesignImage}
            backDesignImage={backDesignImage}
          />

          <TShirtStyleStep
            style={tshirtStyle}
            color={tshirtColor}
            gender={tshirtGender}
            size={tshirtSize}
            material={tshirtMaterial}
            onStyleChange={setTshirtStyle}
            onColorChange={setTshirtColor}
            onGenderChange={setTshirtGender}
            onSizeChange={setTshirtSize}
            onMaterialChange={setTshirtMaterial}
          />

          <TShirtEffectStep
            frontDesignImage={frontDesignImage}
            backDesignImage={backDesignImage}
            tshirtStyle={tshirtStyle}
            tshirtColor={tshirtColor}
            tshirtGender={tshirtGender}
            onFrontPreviewCapture={setFrontPreviewImage}
            onBackPreviewCapture={setBackPreviewImage}
          />

          <ConfirmDesignStep
            tshirtStyle={tshirtStyle}
            tshirtColor={tshirtColor}
            tshirtGender={tshirtGender}
            tshirtSize={tshirtSize}
            frontDesignImage={frontDesignImage}
            backDesignImage={backDesignImage}
            frontPreviewImage={frontPreviewImage}
            backPreviewImage={backPreviewImage}
          />
        </div>
      </div>
    </div>
  );
};