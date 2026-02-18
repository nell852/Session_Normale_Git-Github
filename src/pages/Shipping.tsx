import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white dark:bg-blue-600/30 dark:text-gray-100">
              Livraison
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-gray-100">
              Informations sur la Livraison
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 dark:text-gray-300">
              Découvrez nos options de livraison rapides et fiables pour recevoir vos vêtements préférés directement chez vous.
            </p>
            <Button size="lg" asChild>
              <Link to="/products">
                <span className="flex items-center">
                  Retourner à la boutique
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Nos Options de Livraison
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Truck className="h-8 w-8 text-brand-blue dark:text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Livraison Standard
                  </h3>
                </div>
                <p className="text-muted-foreground dark:text-gray-400 mb-4">
                  Livraison en 3-5 jours ouvrables. Gratuite pour les commandes de plus de 15000.
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Coût : 5000 (ou gratuit dès 15000)
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Truck className="h-8 w-8 text-brand-blue dark:text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Livraison Express
                  </h3>
                </div>
                <p className="text-muted-foreground dark:text-gray-400 mb-4">
                  Livraison en 1-2 jours ouvrables pour les commandes urgentes.
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Coût : 10000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            Questions Fréquentes sur la Livraison
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Quels sont les délais de livraison ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                La livraison standard prend 3-5 jours ouvrables, tandis que la livraison express prend 1-2 jours ouvrables.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Livrez-vous à l'international ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Oui, nous livrons dans plusieurs pays. Contactez notre support pour plus d'informations sur les destinations et coûts.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Puis-je suivre ma commande ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Oui, un numéro de suivi vous sera envoyé par e-mail une fois votre commande expédiée.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}