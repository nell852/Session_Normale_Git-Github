import React from 'react';
import { Star } from 'lucide-react';
import { useProductReviews, ProductReview } from '@/hooks/useProductReviews';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProductReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

export function ProductReviews({ productId, averageRating, totalReviews }: ProductReviewsProps) {
  const { data: reviews = [], isLoading } = useProductReviews(productId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  const formatUserName = (review: ProductReview) => {
    if (review.profiles?.first_name) {
      const firstName = review.profiles.first_name;
      const lastName = review.profiles?.last_name;
      return lastName ? `${firstName} ${lastName.charAt(0)}.` : firstName;
    }
    return 'Utilisateur anonyme';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold">{averageRating}</div>
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Basé sur {totalReviews} avis</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">Aucun avis pour ce produit.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-sm">{formatUserName(review)}</span>
                {review.verified_purchase && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Achat vérifié
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.created_at), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              </div>
              {review.title && <h4 className="font-medium text-sm mb-1">{review.title}</h4>}
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
