import { FabricCard } from './fabric/FabricCard';
import { ProcessSteps } from './fabric/ProcessSteps';
import { TestingItems } from './fabric/TestingItems';
import { FabricIntro } from './fabric/FabricIntro';

export const Categories = () => {
  const fabrics = [
    {
      id: 1,
      name: "纯棉",
      description: "采用优质长绒棉制成，纤维细腻柔软，透气性好。经过严格的精梳工艺处理，去除短纤维和杂质，确保面料品质稳定。我们走访了数十家面料厂，反复测试和比对，最终选定这款触感细腻、吸汗透气的高支纯棉面料。",
      details: [
        "采用优质长绒棉，纤维长度达到38mm以上",
        "经过精梳工序，去除98%的短纤维",
        "40支高支纱，织造细腻平整",
        "优异的透气性和吸湿性，穿着更加舒适"
      ],
      image: "https://images.unsplash.com/photo-1599666433232-2b222eb02b8c?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "速干",
      description: "采用先进的聚酯纤维材料，具有出色的导湿排汗性能。这种材料能够快速将汗水从皮肤表面转移到布料表面并迅速蒸发，让您在运动或炎热天气中依然保持干爽舒适。经过数百次测试，确保其具有优秀的速干性能和耐用性。",
      details: [
        "采用高科技聚酯纤维，快速导湿排汗",
        "特殊的纤维结构，加快水分蒸发",
        "轻薄透气，运动时更加舒适",
        "耐磨耐用，不易变形，保持挺括"
      ],
      image: "https://images.unsplash.com/photo-1544032527-042957c6f7ce?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#0EA5E9]/10 via-white to-[#ea384c]/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] bg-clip-text text-transparent">匠心甄选 精工织造</h2>
        <FabricIntro />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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