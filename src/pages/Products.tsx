import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; // Ajout de l'import
import { Grid, List, Filter, Search } from 'lucide-react';
// import { Button } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { useProducts } from '@/hooks/useProducts';
import { FilterOptions, SortOption } from '@/types';

// Fonction pour formater les prix en FCFA (XAF)
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(price);
};

const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name', label: 'Nom A-Z' },
];

export default function Products() {
  const { data: products = [], isLoading, error } = useProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [searchParams, setSearchParams] = useSearchParams(); // Ajout de useSearchParams
  const searchQuery = searchParams.get('search') || ''; // Récupérer la valeur de 'search'

  // Calculer la plage de prix maximale dynamiquement
  const maxPrice = useMemo(() => {
    return products.length > 0
      ? Math.ceil(Math.max(...products.map(p => p.on_sale && p.sale_price ? p.sale_price : p.price)))
      : 50000;
  }, [products]);

  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, maxPrice],
    brands: [],
    onSale: false,
  });

  // Filtrer les produits en fonction de la recherche
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchQuery === ''
        ? true
        : product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());

      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category.toLowerCase());
      const matchesSize = filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size));
      const matchesColor = filters.colors.length === 0 || filters.colors.some(color => product.colors.includes(color));
      const price = product.on_sale && product.sale_price ? product.sale_price : product.price;
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const matchesOnSale = !filters.onSale || product.on_sale;

      return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice && matchesOnSale;
    });
  }, [products, searchQuery, filters]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        const priceA = a.on_sale && a.sale_price ? a.sale_price : a.price;
        const priceB = b.on_sale && b.sale_price ? b.sale_price : b.price;
        return priceA - priceB;
      case 'price-desc':
        const priceA2 = a.on_sale && a.sale_price ? a.sale_price : a.price;
        const priceB2 = b.on_sale && b.sale_price ? b.sale_price : b.price;
        return priceB2 - priceA2;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const clearFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, maxPrice],
      brands: [],
      onSale: false,
    });
    setSearchParams({}); // Réinitialiser les paramètres d'URL
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Erreur de chargement</h2>
          <p className="text-muted-foreground">
            Impossible de charger les produits. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Produits</h1>
          <p className="text-muted-foreground">
            {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchParams({ search: e.target.value })} // Mettre à jour les paramètres d'URL
              placeholder="Rechercher un produit..."
              className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClear={clearFilters}
            formatPrice={formatPrice}
          />
        </aside>

        <main className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Essayez d'ajuster vos filtres ou votre recherche pour voir plus de résultats
              </p>
              <Button onClick={clearFilters}>Effacer les filtres et recherche</Button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}