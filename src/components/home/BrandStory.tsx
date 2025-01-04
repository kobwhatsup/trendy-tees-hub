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
            2023年，我们引入了革命性的AI设计师系统，开启了服装定制的新纪元。
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#ea384c]">AI创新</h3>
            <p className="text-muted-foreground leading-relaxed">
              引入先进的AI设计师系统，将人工智能与时尚创意完美结合。
              我们的AI能够理解您的设计理念，为您打造独一无二的个性化T恤，开创服装定制新时代。
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
              致力于为每一位顾客提供兼具品质与个性的服装产品。通过AI技术赋能，
              让每一件T恤都成为独特的艺术品，让每位顾客都能享受到科技与时尚的完美融合。
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-3 text-[#ea384c]">未来展望</h4>
            <p className="text-muted-foreground leading-relaxed">
              我们将持续优化AI设计系统，探索更多可能性。通过技术创新推动服装产业升级，
              为用户提供更智能、更个性化的设计体验，引领服装定制的未来发展方向。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};