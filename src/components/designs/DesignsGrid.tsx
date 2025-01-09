import { DesignCard } from "./DesignCard";

interface DesignsGridProps {
  designs: any[];
  filterPublic?: boolean;
}

export const DesignsGrid = ({ designs, filterPublic = false }: DesignsGridProps) => {
  const filteredDesigns = filterPublic ? designs.filter(d => d.is_public) : designs;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDesigns.map((design) => (
        <DesignCard key={design.id} design={design} />
      ))}
    </div>
  );
};