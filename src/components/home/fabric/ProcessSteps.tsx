export const ProcessSteps = () => {
  const steps = [
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
  ];

  return (
    <div className="bg-white/50 rounded-2xl p-8 backdrop-blur-sm mb-16">
      <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] bg-clip-text text-transparent">
        严苛的面料选择流程
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, index) => (
          <div key={index} className="text-center p-8 rounded-xl bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <div className="font-bold text-lg text-[#0EA5E9] mb-3">{item.step}</div>
            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};