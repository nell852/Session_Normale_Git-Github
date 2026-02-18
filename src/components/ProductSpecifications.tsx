import React from 'react';
import { useProductSpecifications } from '@/hooks/useProductSpecifications';

interface ProductSpecificationsProps {
  productId: string;
}

export function ProductSpecifications({ productId }: ProductSpecificationsProps) {
  const { data: specifications = [], isLoading } = useProductSpecifications(productId);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (specifications.length === 0) {
    return (
      <p className="text-muted-foreground">Aucune caractéristique disponible pour ce produit.</p>
    );
  }

  // Group specifications by category
  const groupedSpecs = specifications.reduce(
    (acc, spec) => {
      if (!acc[spec.category]) {
        acc[spec.category] = [];
      }
      acc[spec.category].push(spec);
      return acc;
    },
    {} as Record<string, typeof specifications>
  );

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      materials: 'Matériaux',
      care: 'Entretien',
      dimensions: 'Dimensions',
      features: 'Caractéristiques',
    };
    return titles[category] || category;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {Object.entries(groupedSpecs).map(([category, specs]) => (
        <div key={category}>
          <h3 className="font-semibold mb-3">{getCategoryTitle(category)}</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {specs.map((spec) => (
              <li key={spec.id}>{spec.value ? `${spec.name}: ${spec.value}` : spec.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
