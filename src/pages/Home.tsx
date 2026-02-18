
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockProducts } from '@/data/mockData';

export default function Home() {
  const { t } = useLanguage();

  const featuredProducts = mockProducts.filter(p => p.featured);
  const saleProducts = mockProducts.filter(p => p.on_sale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue-dark to-brand-navy text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-white/20 text-white border-white/30">
              Nouvelle Collection 2024
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in-up">
              {t('home.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 animate-fade-in-up">
              {t('home.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button asChild size="lg" className="bg-white text-brand-blue hover:bg-gray-100">
                <Link to="/products">
                  Découvrir la Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-blue">
                <Link to="/products?sale=true">
                  Voir les Promotions
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-4 hover-lift p-6 rounded-lg bg-background shadow-sm">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-semibold">Livraison Gratuite</h3>
              <p className="text-sm text-muted-foreground">
                Livraison gratuite dès 5000 FCFA d'achat
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift p-6 rounded-lg bg-background shadow-sm">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-semibold">Garantie Qualité</h3>
              <p className="text-sm text-muted-foreground">
                Satisfaction garantie ou remboursé
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift p-6 rounded-lg bg-background shadow-sm">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-semibold">Retour 30 jours</h3>
              <p className="text-sm text-muted-foreground">
                Retours gratuits sous 30 jours
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift p-6 rounded-lg bg-background shadow-sm">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="font-semibold">Service Client</h3>
              <p className="text-sm text-muted-foreground">
                Support client 7j/7 disponible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t('home.featured')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de produits premium, choisis pour leur qualité et leur style unique
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/products">
                Voir Tous les Produits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <Badge className="bg-red-500 text-white text-lg px-4 py-2">
                {t('home.onSale')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Promotions Limitées</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Profitez de nos offres exceptionnelles sur une sélection de produits
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
                <Link to="/products?sale=true">
                  Voir Toutes les Promotions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Restez Informé</h2>
            <p className="text-lg text-blue-100">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières nouveautés et offres exclusives
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-black"
              />
              <Button className="bg-brand-blue hover:bg-brand-blue-dark">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
