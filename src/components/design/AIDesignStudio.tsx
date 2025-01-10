import { useCallback } from "react";
import { useDesignGeneration } from "./hooks/useDesignGeneration";
import { useDesignState } from "./hooks/useDesignState";
import { useSaveDesign } from "./hooks/useSaveDesign";
import { DesignDescription } from "./steps/DesignDescription";
import { DesignPreviewStep } from "./steps/DesignPreviewStep";
import { TShirtStyleStep } from "./steps/TShirtStyleStep";
import { TShirtEffectStep } from "./steps/TShirtEffectStep";
import { ConfirmDesignStep } from "./steps/ConfirmDesignStep";

export const AIDesignStudio = () => {
  const {
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
  } = useDesignState();

  const {
    isGenerating,
    frontDesignImage,
    backDesignImage,
    generateDesign,
    setFrontDesignImage,
    setBackDesignImage
  } = useDesignGeneration();

  const { saveDesignProject } = useSaveDesign();

  const handleGenerate = (position: "front" | "back") => {
    const prompt = position === "front" ? frontPrompt : backPrompt;
    generateDesign(prompt, position);
  };

  const handleDesignImagesChange = useCallback((frontImage: string, backImage: string) => {
    setFrontDesignImage(frontImage);
    setBackDesignImage(backImage);
  }, [setFrontDesignImage, setBackDesignImage]);

  const handleSettingsChange = (position: "front" | "back", settings: DesignSettings) => {
    if (position === "front") {
      setFrontDesignSettings(settings);
    } else {
      setBackDesignSettings(settings);
    }
  };

  const handleSaveDesign = () => {
    saveDesignProject({
      frontPrompt,
      backPrompt,
      frontDesignImage,
      backDesignImage,
      tshirtGender,
      tshirtStyle,
      tshirtMaterial,
      tshirtSize,
      tshirtColor,
      frontDesignSettings,
      backDesignSettings,
      frontPreviewImage,
      backPreviewImage
    });
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
            onDesignImagesChange={handleDesignImagesChange}
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
            onFrontSettingsChange={(settings) => handleSettingsChange("front", settings)}
            onBackSettingsChange={(settings) => handleSettingsChange("back", settings)}
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
            onSave={handleSaveDesign}
          />
        </div>
      </div>
    </div>
  );
};