import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useProduct } from '@/hooks/useProducts';
import { useProductReviewsStats } from '@/hooks/useProductReviews';
import { formatPrice } from '@/lib/currency';
import { ProductReviews } from '@/components/ProductReviews';
import { ProductSpecifications } from '@/components/ProductSpecifications';
import { ShareButton } from '@/components/ShareButton';
import { supabase } from '../integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id!);
  const { data: reviewsStats } = useProductReviewsStats(id!);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // State for modal

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <p className="text-muted-foreground mb-4">
            Le produit que vous cherchez n'existe pas ou n'est plus disponible.
          </p>
          <Button asChild>
            <Link to="/products">Retour aux produits</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Veuillez sélectionner une taille et une couleur');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartModalOpen(true); // Open modal after adding to cart
  };

  const handleGoToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Veuillez sélectionner une taille et une couleur');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/cart');
  };

  const handleGoToCartFromModal = () => {
    setIsCartModalOpen(false); // Close modal
    navigate('/cart'); // Navigate to cart
  };

  const price = product.on_sale && product.sale_price ? product.sale_price : product.price;
  const originalPrice = product.on_sale ? product.price : null;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      setSubmitStatus('Veuillez entrer un commentaire et une note.');
      return;
    }

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) {
      setSubmitStatus('Vous devez être connecté pour laisser un commentaire.');
      return;
    }

    const { error } = await supabase
      .from('product_reviews')
      .insert({
        product_id: id,
        user_id: userId,
        comment,
        rating,
      });

    if (error) {
      setSubmitStatus('Erreur lors de l\'envoi du commentaire : ' + error.message);
    } else {
      setComment('');
      setRating(null);
      setSubmitStatus('Commentaire soumis avec succès !');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Accueil</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-foreground">Produits</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <Button variant="ghost" asChild className="mb-6">
        <Link to="/products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux produits
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images[selectedImage] && (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-brand-blue' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.on_sale && (
                <Badge className="bg-red-500 text-white">Promotion</Badge>
              )}
              {product.featured && (
                <Badge className="bg-brand-blue text-white">Vedette</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.category}</p>
          </div>

          {reviewsStats && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(reviewsStats.averageRating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviewsStats.totalReviews} avis)
              </span>
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div>
              <Label className="text-base font-medium">Taille</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex gap-2 mt-2">
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem value={size} id={size} className="sr-only" />
                    <Label
                      htmlFor={size}
                      className={`px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                        selectedSize === size
                          ? 'border-brand-blue bg-brand-blue text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div>
              <Label className="text-base font-medium">Couleur</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-2 mt-2">
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center">
                    <RadioGroupItem value={color} id={color} className="sr-only" />
                    <Label
                      htmlFor={color}
                      className={`px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                        selectedColor === color
                          ? 'border-brand-blue bg-brand-blue text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div>
            <Label className="text-base font-medium">Quantité</Label>
            <div className="flex items-center gap-3 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="flex-1"
              onClick={handleGoToCart}
            >
              Commander
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
            <ShareButton title={product.name} />
          </div>

          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-brand-blue" />
              <span className="text-sm">Livraison gratuite dès 10000 XAF</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-brand-blue" />
              <span className="text-sm">Garantie satisfaction 30 jours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <Dialog open={isCartModalOpen} onOpenChange={setIsCartModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Article ajouté au panier</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              {product.name} ({selectedSize}, {selectedColor}, Quantité: {quantity}) a été ajouté à votre panier.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCartModalOpen(false)}>
              Continuer mes achats
            </Button>
            <Button onClick={handleGoToCartFromModal}>
              Commander
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
            <TabsTrigger value="reviews">
              Avis {reviewsStats ? `(${reviewsStats.totalReviews})` : ''}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>Ce produit fait partie de notre collection premium, conçue avec des matériaux de haute qualité pour vous offrir confort et style au quotidien.</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <ProductSpecifications productId={product.id} />
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews 
              productId={product.id}
              averageRating={reviewsStats?.averageRating || 0}
              totalReviews={reviewsStats?.totalReviews || 0}
            />
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Laisser un commentaire</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <Label htmlFor="rating">Note (1-5)</Label>
                  <RadioGroup value={rating?.toString() || ''} onValueChange={(value) => setRating(Number(value))} className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="flex items-center">
                        <RadioGroupItem value={star.toString()} id={`star-${star}`} className="sr-only" />
                        <Label
                          htmlFor={`star-${star}`}
                          className={`px-3 py-1 border rounded-lg cursor-pointer ${
                            rating === star ? 'bg-brand-blue text-white' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {star} ★
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="comment">Commentaire</Label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-1"
                    rows={4}
                    placeholder="Partagez votre avis..."
                  />
                </div>
                <Button type="submit">Envoyer</Button>
                {submitStatus && <p className="mt-2 text-sm text-muted-foreground">{submitStatus}</p>}
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}