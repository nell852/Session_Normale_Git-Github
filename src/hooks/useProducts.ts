import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Product } from '@/types';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          *,
          categories(name, slug),
          brands(name, slug)
        `
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: parseFloat(product.price.toString()),
        sale_price: product.sale_price ? parseFloat(product.sale_price.toString()) : undefined,
        on_sale: product.on_sale || false,
        images: product.images || [],
        category: product.categories?.name || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        stock: product.stock || 0,
        featured: product.featured || false,
        created_at: product.created_at,
        updated_at: product.updated_at,
      }));
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          *,
          categories(name, slug),
          brands(name, slug)
        `
        )
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }

      if (!data) return null;

      return {
        id: data.id,
        name: data.name,
        description: data.description || '',
        price: parseFloat(data.price.toString()),
        sale_price: data.sale_price ? parseFloat(data.sale_price.toString()) : undefined,
        on_sale: data.on_sale || false,
        images: data.images || [],
        category: data.categories?.name || '',
        sizes: data.sizes || [],
        colors: data.colors || [],
        stock: data.stock || 0,
        featured: data.featured || false,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    },
    enabled: !!id,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          *,
          categories(name, slug),
          brands(name, slug)
        `
        )
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching featured products:', error);
        throw error;
      }

      return data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: parseFloat(product.price.toString()),
        sale_price: product.sale_price ? parseFloat(product.sale_price.toString()) : undefined,
        on_sale: product.on_sale || false,
        images: product.images || [],
        category: product.categories?.name || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        stock: product.stock || 0,
        featured: product.featured || false,
        created_at: product.created_at,
        updated_at: product.updated_at,
      }));
    },
  });
}
export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          *,
          categories(name, slug),
          brands(name, slug)
        `
        )
        .eq('categories.name', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        throw error;
      }

      return data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: parseFloat(product.price.toString()),
        sale_price: product.sale_price ? parseFloat(product.sale_price.toString()) : undefined,
        on_sale: product.on_sale || false,
        images: product.images || [],
        category: product.categories?.name || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        stock: product.stock || 0,
        featured: product.featured || false,
        created_at: product.created_at,
        updated_at: product.updated_at,
      }));
    },
    enabled: !!category,
  });
}
