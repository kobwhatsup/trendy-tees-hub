import { useNavigate } from "react-router-dom";

export const Categories = () => {
  const navigate = useNavigate();
  
  const fabrics = [
    {
      id: 1,
      name: "精梳棉",
      description: "采用优质长绒棉制成，纤维细腻柔软，透气性好，穿着舒适。经过精梳工艺处理，去除短纤维，确保面料品质稳定。",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "莱卡棉",
      description: "添加适量弹性纤维，具有良好的延展性和恢复性，贴合身形又不失舒适。耐磨耐洗，不易变形。",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "珠地网眼棉",
      description: "采用蜂窝状编织工艺，透气性极佳，适合运动休闲场景。表面细腻平整，触感柔和，穿着清爽。",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#E5DEFF] via-white to-[#FFDEE2]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">精选面料</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          我们严选优质面料，只为带给您最舒适的穿着体验
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div className="p-8 text-center">
                <h3 className="font-bold text-2xl mb-3 text-[#6E59A5] group-hover:text-[#9b87f5] transition-colors">
                  {fabric.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {fabric.description}
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#9b87f5] rounded-xl transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};