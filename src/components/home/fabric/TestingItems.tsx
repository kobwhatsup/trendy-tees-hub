export const TestingItems = () => {
  const testItems = [
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
  ];

  return (
    <div className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#ea384c]/10 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] bg-clip-text text-transparent">
        专业检测项目
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {testItems.map((item, index) => (
          <div 
            key={index}
            className="bg-white/70 backdrop-blur-sm rounded-lg p-4 text-center text-sm text-muted-foreground hover:bg-white/90 transition-colors hover:shadow-md"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};