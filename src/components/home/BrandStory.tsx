export const BrandStory = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#ea384c]/5 via-white to-[#0EA5E9]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#ea384c] bg-clip-text text-transparent">
            品牌故事
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            自2010年创立以来，我们始终秉持"质量至上、创新为魂"的理念，专注于打造高品质的服装产品。
            十余年来，我们不断探索和创新，从面料选择到工艺改进，每一个细节都力求完美。
            我们相信，一件好的T恤不仅仅是一件衣服，更是穿着者品味与个性的完美展现。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="mb-6 text-[#0EA5E9] group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#0EA5E9]">匠心品质</h3>
            <p className="text-muted-foreground leading-relaxed">
              精选优质面料，严格把控生产工艺，只为带给您最舒适的穿着体验。
              从原料采购到成品出厂，每一个环节都经过严格的品质检验，确保产品品质始终如一。
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="mb-6 text-[#ea384c] group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#ea384c]">原创设计</h3>
            <p className="text-muted-foreground leading-relaxed">
              独特的设计理念，新颖的图案元素，让每件T恤都成为独一无二的艺术品。
              我们的设计团队持续关注全球时尚趋势，将创意与实用完美结合，打造独具特色的服装系列。
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="mb-6 text-[#0EA5E9] group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#0EA5E9]">环保理念</h3>
            <p className="text-muted-foreground leading-relaxed">
              采用环保材料与工艺，为地球的可持续发展贡献一份力量。
              我们积极推进绿色生产，从原料选择到包装设计，始终坚持环保理念，打造负责任的时尚品牌。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-3 text-[#0EA5E9]">我们的使命</h4>
            <p className="text-muted-foreground leading-relaxed">
              致力于为每一位顾客提供兼具品质与风格的服装产品，让时尚与舒适完美融合。
              我们相信，优质的产品不仅能提升穿着体验，更能为您的生活增添一份独特的魅力。
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-3 text-[#ea384c]">未来展望</h4>
            <p className="text-muted-foreground leading-relaxed">
              我们将继续探索创新工艺，引领时尚潮流，为您带来更多优质的产品选择。
              同时，我们也将持续践行环保理念，为建设可持续发展的时尚产业贡献力量。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};