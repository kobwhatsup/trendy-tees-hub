export const BrandStory = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#ea384c]/5 via-white to-[#0EA5E9]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] bg-clip-text text-transparent">
            品牌故事
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            我们致力于为您提供最优质的T恤产品，每一件都凝聚着我们对品质的追求和对时尚的理解。
            选择我们，让您的衣橱焕发新的活力。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-xl mb-3 text-[#0EA5E9]">匠心品质</h3>
              <p className="text-muted-foreground">精选优质面料，严格把控生产工艺，只为带给您最舒适的穿着体验。</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-xl mb-3 text-[#ea384c]">原创设计</h3>
              <p className="text-muted-foreground">独特的设计理念，新颖的图案元素，让每件T恤都成为独一无二的艺术品。</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-xl mb-3 text-[#0EA5E9]">环保理念</h3>
              <p className="text-muted-foreground">采用环保材料与工艺，为地球的可持续发展贡献一份力量。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};