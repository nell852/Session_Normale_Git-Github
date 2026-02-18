import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SizeGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white dark:bg-blue-600/30 dark:text-gray-100">
              Guide des Tailles
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-gray-100">
              Guide des Tailles
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 dark:text-gray-300">
              Trouvez la taille parfaite pour vos vêtements avec notre guide détaillé des mesures.
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

      {/* Size Chart */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Tableau des Tailles (Homme)
            </h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Ruler className="h-8 w-8 text-brand-blue dark:text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Mesures des Polos
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-muted-foreground dark:text-gray-400">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">Taille</th>
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        Poitrine (cm)
                      </th>
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        Épaules (cm)
                      </th>
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        Longueur (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4">S</td>
                      <td className="p-4">86-91</td>
                      <td className="p-4">42-44</td>
                      <td className="p-4">68-70</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4">M</td>
                      <td className="p-4">91-96</td>
                      <td className="p-4">44-46</td>
                      <td className="p-4">70-72</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4">L</td>
                      <td className="p-4">96-101</td>
                      <td className="p-4">46-48</td>
                      <td className="p-4">72-74</td>
                    </tr>
                    <tr>
                      <td className="p-4">XL</td>
                      <td className="p-4">101-106</td>
                      <td className="p-4">48-50</td>
                      <td className="p-4">74-76</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            Conseils pour Choisir la Bonne Taille
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Comment mesurer votre poitrine
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Utilisez un ruban à mesurer et passez-le sous vos aisselles, autour de la partie la
                plus large de votre poitrine.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Entre deux tailles ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Si vous êtes entre deux tailles, nous recommandons de choisir la taille supérieure
                pour plus de confort.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Besoin d'aide ?
              </h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Contactez notre support client pour des conseils personnalisés sur le choix de votre
                taille.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
