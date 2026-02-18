import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Returns() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white dark:bg-blue-600/30 dark:text-gray-100">
              Retours & Échanges
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-gray-100">
              Politique de Retours & Échanges
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 dark:text-gray-300">
              Nous voulons que vous soyez entièrement satisfait de votre achat. Découvrez comment retourner ou échanger vos articles facilement.
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

      {/* Returns Policy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Comment Fonctionnent les Retours & Échanges
            </h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Package className="h-8 w-8 text-brand-blue dark:text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Conditions de Retour
                </h3>
              </div>
              <ul className="list-disc pl-6 text-muted-foreground dark:text-gray-400 space-y-2">
                <li>Les articles doivent être retournés dans les 30 jours suivant la réception.</li>
                <li>Les articles doivent être non portés, non lavés et dans leur état d'origine avec étiquettes.</li>
                <li>Les frais de retour sont à la charge du client, sauf en cas d'erreur de notre part.</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
              <div className="flex items-center mb-4">
                <Package className="h-8 w-8 text-brand-blue dark:text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Processus de Retour
                </h3>
              </div>
              <ol className="list-decimal pl-6 text-muted-foreground dark:text-gray-400 space-y-2">
                <li>Contactez notre support client pour obtenir un numéro d'autorisation de retour.</li>
                <li>Emballez les articles avec le formulaire de retour inclus dans votre colis.</li>
                <li>Envoyez le colis à l'adresse indiquée par notre équipe.</li>
                <li>Recevez un remboursement ou un échange une fois le colis traité.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            Questions Fréquentes sur les Retours
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Combien de temps prend un remboursement ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Les remboursements sont traités dans les 5-7 jours ouvrables après réception de l'article retourné.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Puis-je échanger un article contre une autre taille ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Oui, les échanges sont possibles sous réserve de disponibilité. Contactez-nous pour organiser un échange.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Que faire si j'ai reçu un article défectueux ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Contactez notre support immédiatement. Nous couvrirons les frais de retour et fournirons un remplacement ou un remboursement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}