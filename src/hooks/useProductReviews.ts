import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProductReview {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
}

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: async (): Promise<ProductReview[]> => {
      const { data, error } = await supabase
        .from('product_reviews')
        .select(`
          *,
          profiles(first_name, last_name)
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching product reviews:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!productId,
  });
}

export function useProductReviewsStats(productId: string) {
  return useQuery({
    queryKey: ['product-reviews-stats', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('rating')
        .eq('product_id', productId);

      if (error) {
        console.error('Error fetching reviews stats:', error);
        throw error;
      }

      const reviews = data || [];
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
        : 0;

      return {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10
      };
    },
    enabled: !!productId,
  });
}