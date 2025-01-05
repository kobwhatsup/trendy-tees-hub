import { useState } from "react";
import { DesignInput } from "./DesignInput";
import { DesignPreview } from "./DesignPreview";
import { TShirtStyleSelector } from "./TShirtStyleSelector";
import { TShirtColorPreview } from "./TShirtColorPreview";
import { ConfirmDesign } from "./ConfirmDesign";
import { useDesignGeneration } from "./hooks/useDesignGeneration";

export const AIDesignStudio = () => {
  const [frontPrompt, setFrontPrompt] = useState("");
  const [backPrompt, setBackPrompt] = useState("");
  const [tshirtStyle, setTshirtStyle] = useState("short");
  const [tshirtColor, setTshirtColor] = useState("white");
  const [tshirtGender, setTshirtGender] = useState("male");

  const {
    isGenerating,
    frontDesignImage,
    backDesignImage,
    generateDesign
  } = useDesignGeneration();

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
          {/* 步骤1：设计描述 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第一步 设计描述
            </h2>
            <div className="w-full">
              <DesignInput
                frontPrompt={frontPrompt}
                backPrompt={backPrompt}
                isGenerating={isGenerating}
                onFrontPromptChange={setFrontPrompt}
                onBackPromptChange={setBackPrompt}
                onGenerate={generateDesign}
              />
            </div>
          </section>

          {/* 步骤2：设计预览 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第二步 设计预览
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <DesignPreview designImage={frontDesignImage} title="正面设计" />
              <DesignPreview designImage={backDesignImage} title="背面设计" />
            </div>
          </section>

          {/* 步骤3：T恤款式 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第三步 T恤款式
            </h2>
            <div className="w-full">
              <TShirtStyleSelector
                style={tshirtStyle}
                color={tshirtColor}
                gender={tshirtGender}
                onStyleChange={setTshirtStyle}
                onColorChange={setTshirtColor}
                onGenderChange={setTshirtGender}
              />
            </div>
          </section>

          {/* 步骤4：T恤效果 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第四步 T恤效果
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4 text-center">正面效果</h3>
                <TShirtColorPreview 
                  designImage={frontDesignImage}
                  tshirtStyle={tshirtStyle}
                  tshirtColor={tshirtColor}
                  tshirtGender={tshirtGender}
                  position="front"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4 text-center">背面效果</h3>
                <TShirtColorPreview 
                  designImage={backDesignImage}
                  tshirtStyle={tshirtStyle}
                  tshirtColor={tshirtColor}
                  tshirtGender={tshirtGender}
                  position="back"
                />
              </div>
            </div>
          </section>

          {/* 步骤5：确认设计 */}
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 w-full text-center py-2 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] text-white">
              第五步 确认设计
            </h2>
            <div className="w-full">
              <ConfirmDesign
                tshirtStyle={tshirtStyle}
                tshirtColor={tshirtColor}
                tshirtGender={tshirtGender}
                frontDesignImage={frontDesignImage}
                backDesignImage={backDesignImage}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};