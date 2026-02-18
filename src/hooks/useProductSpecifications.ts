import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductSpecification {
  id: string;
  category: string;
  name: string;
  value: string;
  display_order: number;
}

export function useProductSpecifications(productId: string) {
  return useQuery({
    queryKey: ['product-specifications', productId],
    queryFn: async (): Promise<ProductSpecification[]> => {
      const { data, error } = await supabase
        .from('product_specifications')
        .select('*')
        .eq('product_id', productId)
        .order('category')
        .order('display_order');

      if (error) {
        console.error('Error fetching product specifications:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!productId,
  });
}
