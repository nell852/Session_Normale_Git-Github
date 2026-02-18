import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FilterOptions } from '@/types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClear: () => void;
  formatPrice: (price: number) => string;
}

const categories = [
  { id: 'polos', label: 'Polos' },
  { id: 'tshirts', label: 'T-Shirts' },
  { id: 'sweats', label: 'Sweats' },
  { id: 'chemises', label: 'Chemises' },
  { id: 'chaussures', label: 'Chaussures' },
  { id: 'parfums', label: 'Parfums' }, // Ajout de la catégorie Chaussures
];

const sizes = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '36', // Ajout des pointures
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
];

const colors = [
  'Noir',
  'Blanc',
  'Gris',
  'Marine',
  'Rouge',
  'Bleu',
  'Vert',
  'Jaune',
  'Rose',
  'Violet',
];

const brands = ['StyleThread', 'Premium', 'Classic', 'Urban', 'Sport'];

export function ProductFilters({
  filters,
  onFiltersChange,
  onClear,
  formatPrice,
}: ProductFiltersProps) {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleArrayFilter = (key: 'categories' | 'sizes' | 'colors' | 'brands', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];

    updateFilter(key, newArray);
  };

  return (
    <div className="w-full lg:w-64 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtres
        </h3>
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4" />
          Effacer
        </Button>
      </div>

      {/* Categories */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Catégories
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => toggleArrayFilter('categories', category.id)}
              />
              <Label htmlFor={category.id} className="text-sm">
                {category.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Prix
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              min={0}
              max={filters.priceRange[1] || 50000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Sizes */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Tailles
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={size}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={() => toggleArrayFilter('sizes', size)}
                />
                <Label htmlFor={size} className="text-sm">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Colors */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Couleurs
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={filters.colors.includes(color)}
                onCheckedChange={() => toggleArrayFilter('colors', color)}
              />
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                <Label htmlFor={color} className="text-sm">
                  {color}
                </Label>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Brands */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
          Marques
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleArrayFilter('brands', brand)}
              />
              <Label htmlFor={brand} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* On Sale */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="onSale"
          checked={filters.onSale}
          onCheckedChange={(checked) => updateFilter('onSale', checked)}
        />
        <Label htmlFor="onSale" className="text-sm">
          En promotion
        </Label>
      </div>
    </div>
  );
}
