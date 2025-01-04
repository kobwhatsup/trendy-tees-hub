import { FabricCard } from './fabric/FabricCard';
import { ProcessSteps } from './fabric/ProcessSteps';
import { TestingItems } from './fabric/TestingItems';
import { FabricIntro } from './fabric/FabricIntro';

export const Categories = () => {
  const fabrics = [
    {
      id: 1,
      name: "精梳棉",
      description: "采用优质长绒棉制成，纤维细腻柔软，透气性好。经过严格的精梳工艺处理，去除短纤维和杂质，确保面料品质稳定。我们走访了数十家面料厂，反复测试和比对，最终选定这款触感细腻、吸汗透气的高支精梳棉。",
      details: [
        "采用新疆优质长绒棉，纤维长度达到38mm以上",
        "经过三道精梳工序，去除98%的短纤维",
        "40支高支纱，织造细腻平整",
        "优异的透气性和吸湿性，穿着更加舒适"
      ],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "莱卡棉",
      description: "经过6个月的配比实验，我们找到了最佳的棉纶混纺比例，让面料既保持棉花的柔软透气，又具备良好的弹性和贴合性。这款莱卡棉经过数百次水洗测试，证实其具有优秀的形态保持性和耐用性。",
      details: [
        "95%精梳棉 + 5%莱卡纤维的黄金配比",
        "四向弹力设计，活动自如不变形",
        "经过200次以上水洗测试，确保耐用性",
        "独特的编织工艺，提供出色的贴合度"
      ],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "珠地网眼棉",
      description: "为了找到最适合运动场景的面料，我们测试了超过50种不同织法的网眼棉。最终选定这款采用创新蜂窝状编织工艺的珠地网眼棉，在保持透气性的同时，还能呈现出精致的立体质感。",
      details: [
        "创新蜂窝状编织工艺，提升40%透气性",
        "特殊网眼结构，快速排汗干爽",
        "经过防起球处理，保持平整美观",
        "立体织造工艺，呈现精致质感"
      ],
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#E5DEFF] via-white to-[#FFDEE2]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">匠心甄选 精工织造</h2>
        <FabricIntro />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {fabrics.map((fabric) => (
            <FabricCard key={fabric.id} fabric={fabric} />
          ))}
        </div>

        <ProcessSteps />
        <TestingItems />
      </div>
    </section>
  );
};