interface FabricDetail {
  id: number;
  name: string;
  description: string;
  details: string[];
  image: string;
}

interface FabricCardProps {
  fabric: FabricDetail;
}

export const FabricCard = ({ fabric }: FabricCardProps) => {
  return (
    <div 
      key={fabric.id} 
      className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={fabric.image}
          alt={fabric.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <h3 className="font-bold text-2xl mb-4 text-[#0EA5E9] group-hover:text-[#ea384c] transition-colors">
          {fabric.name}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {fabric.description}
        </p>
        <ul className="space-y-4">
          {fabric.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-[#0EA5E9] mt-1 text-lg">•</span>
              <span className="text-muted-foreground leading-relaxed">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ea384c] rounded-xl transition-all duration-300" />
    </div>
  );
};