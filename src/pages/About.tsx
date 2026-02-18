import React from 'react';
import { Users, Award, Heart, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Award,
      title: 'Qualité Premium',
      description: 'Nous sélectionnons uniquement les meilleurs matériaux pour nos produits',
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Expédition sous 24h et livraison gratuite dès 75€',
    },
    {
      icon: Heart,
      title: 'Satisfaction Client',
      description: 'Notre priorité est votre satisfaction avec un service client dévoué',
    },
    {
      icon: Users,
      title: 'Équipe Passionnée',
      description: 'Une équipe dédiée à vous offrir la meilleure expérience shopping',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">À Propos de StyleThread</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Depuis notre création, StyleThread s'est imposé comme une référence dans la mode
          décontractée premium. Nous concevons des polos et t-shirts qui allient confort, style et
          durabilité.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              StyleThread a été fondé en 2018 par une équipe passionnée de mode et de qualité.
              Frustrés par le manque d'options de vêtements décontractés alliant style et confort,
              nous avons décidé de créer notre propre marque.
            </p>
            <p>
              Chaque produit est soigneusement conçu dans nos ateliers, en utilisant uniquement des
              matériaux premium et des techniques de fabrication respectueuses de l'environnement.
            </p>
            <p>
              Aujourd'hui, nous servons des milliers de clients satisfaits à travers l'Europe, et
              nous continuons d'innover pour vous offrir les meilleurs vêtements décontractés.
            </p>
          </div>
        </div>
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src="/images/team-image.jpg" // ✅ correction ici
            alt="Équipe StyleThread"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-brand-blue" />
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-brand-blue mb-2">50k+</div>
            <div className="text-muted-foreground">Clients Satisfaits</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-blue mb-2">100+</div>
            <div className="text-muted-foreground">Produits Uniques</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-blue mb-2">99%</div>
            <div className="text-muted-foreground">Satisfaction Client</div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Démocratiser la mode de qualité en rendant accessible des vêtements exceptionnels, tout en
          respectant notre planète et en valorisant le savoir-faire artisanal.
        </p>
      </div>
    </div>
  );
}
