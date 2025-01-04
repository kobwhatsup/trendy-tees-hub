import { useNavigate } from "react-router-dom";

export const Categories = () => {
  const navigate = useNavigate();
  
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
        <div className="text-center text-muted-foreground mb-12 max-w-4xl mx-auto space-y-4">
          <p className="text-lg">
            在寻找完美面料的道路上，我们走访了江浙沪三地超过50家面料工厂，
            对数百种面料样品进行了严格的测试和筛选。
          </p>
          <p className="text-lg">
            每一块入选的面料都经过了透气性、吸汗性、起球性、水洗牢度等多达18项专业检测，
            确保它们能够带来卓越的穿着体验。
          </p>
          <p className="text-lg">
            从原料采购到成品面料，我们坚持严格把控每一个环节。
            在长达8个月的筛选过程中，我们反复比对、测试、改进，
            最终选定了这三款能够满足不同场景需求的优质面料。
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {fabrics.map((fabric) => (
            <div 
              key={fabric.id} 
              className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="font-bold text-2xl mb-3 text-[#6E59A5] group-hover:text-[#9b87f5] transition-colors">
                  {fabric.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {fabric.description}
                </p>
                <ul className="space-y-3">
                  {fabric.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#6E59A5] mt-1">•</span>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#9b87f5] rounded-xl transition-all duration-300" />
            </div>
          ))}
        </div>

        <div className="bg-white/50 rounded-2xl p-8 backdrop-blur-sm mb-16">
          <h3 className="text-2xl font-bold text-center mb-6">严苛的面料选择流程</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1. 实地考察",
                desc: "走访优质面料厂，深入了解面料生产工艺"
              },
              {
                step: "2. 样品测试",
                desc: "对采集的样品进行18项专业检测"
              },
              {
                step: "3. 反复验证",
                desc: "多轮水洗测试，确保耐用性和舒适度"
              },
              {
                step: "4. 持续优化",
                desc: "收集用户反馈，不断改进面料品质"
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/70 backdrop-blur-sm">
                <div className="font-bold text-lg text-[#6E59A5] mb-2">{item.step}</div>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#6E59A5]/10 to-[#9b87f5]/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-6">专业检测项目</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "透气性测试",
              "吸湿速干性",
              "起球测试",
              "水洗牢度",
              "耐磨性能",
              "抗皱性能",
              "尺寸稳定性",
              "色牢度测试",
              "接缝强度",
              "手感评估",
              "抗静电性",
              "防紫外线"
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};