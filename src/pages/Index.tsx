import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';

export default function Index() {
  const { data: featuredProducts = [], isLoading } = useFeaturedProducts();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Enhanced Carousel Styles */}
      <style>{`
        @keyframes continuousScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }

        .carousel-container {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .carousel-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 3s infinite;
        }

        .carousel-track {
          display: flex;
          gap: 20px;
          animation: continuousScroll 30s linear infinite;
          will-change: transform;
        }

        .product-card-container {
          flex-shrink: 0;
          width: 300px;
          animation: float 6s ease-in-out infinite;
        }

        .product-card-container:nth-child(2n) {
          animation-delay: -3s;
        }

        .shimmer-loading {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-radius: 16px;
          padding: 24px;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.2) rotate(10deg);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 text-white">Nouvelle Collection</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Style & Élégance</h1>
            <p className="text-xl mb-8 text-blue-100">
              Découvrez notre collection premium de vêtements pour homme. Qualité exceptionnelle,
              style intemporel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  <span className="flex items-center">
                    Découvrir la collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-blue"
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center feature-card">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Livraison gratuite</h3>
              <p className="text-muted-foreground text-sm">Livraison gratuite dès 15000 d'achat</p>
            </div>
            <div className="text-center feature-card">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Garantie qualité</h3>
              <p className="text-muted-foreground text-sm">Satisfaction garantie ou remboursé</p>
            </div>
            <div className="text-center feature-card">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Support 7j/7</h3>
              <p className="text-muted-foreground text-sm">
                Support client disponible tous les jours
              </p>
            </div>
            <div className="text-center feature-card">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Qualité premium</h3>
              <p className="text-muted-foreground text-sm">Matériaux haut de gamme sélectionnés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Produits vedettes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Découvrez notre sélection de produits les plus populaires, choisis pour leur qualité
              et leur style exceptionnel.
            </p>
          </div>

          {isLoading ? (
            <div className="relative w-full h-96">
              <div className="bg-gray-200 rounded-lg h-full shimmer-loading" />
            </div>
          ) : (
            <div className="carousel-container">
              <div className="overflow-hidden">
                <div ref={carouselRef} className="carousel-track">
                  {/* Dupliquer les produits pour un défilement continu */}
                  {[...featuredProducts, ...featuredProducts, ...featuredProducts].map(
                    (product, index) => (
                      <div
                        key={`${product.id}-${index}`}
                        className="product-card-container"
                        style={{
                          animationDelay: `${(index % featuredProducts.length) * 0.2}s`,
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/products">
                <span className="flex items-center">
                  Voir tous les produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières nouveautés et offres
            exclusives directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-brand-blue hover:bg-brand-blue-dark">S'inscrire</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
