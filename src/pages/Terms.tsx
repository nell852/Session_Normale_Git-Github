
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Conditions Générales de Vente</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article 1 - Objet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les présentes conditions générales de vente s'appliquent à toutes les ventes 
                conclues sur le site Internet StyleThread. Elles régissent les relations 
                contractuelles entre StyleThread et ses clients.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article 2 - Prix</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les prix sont indiqués en euros toutes taxes comprises. StyleThread se réserve 
                le droit de modifier ses prix à tout moment, mais les produits seront facturés 
                sur la base des tarifs en vigueur au moment de la validation de la commande.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article 3 - Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Toute commande passée sur le site constitue un contrat de vente. 
                  La validation de la commande implique l'acceptation des présentes 
                  conditions générales.
                </p>
                <p>
                  StyleThread se réserve le droit d'annuler toute commande en cas 
                  d'indisponibilité du produit ou de problème concernant le règlement.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article 4 - Livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Les délais de livraison sont donnés à titre indicatif. Les produits 
                  sont expédiés à l'adresse de livraison indiquée lors de la commande.
                </p>
                <p>
                  La livraison est gratuite pour toute commande supérieure à 75€ 
                  en France métropolitaine.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article 5 - Droit de rétractation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Conformément à la législation en vigueur, vous disposez d'un délai 
                  de 14 jours pour exercer votre droit de rétractation sans avoir à 
                  justifier de motifs ni à payer de pénalités.
                </p>
                <p>
                  Les produits doivent être retournés dans leur emballage d'origine, 
                  en parfait état, avec tous les accessoires.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article 6 - Garanties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tous nos produits bénéficient de la garantie légale de conformité 
                et de la garantie contre les vices cachés. StyleThread s'engage à 
                réparer ou remplacer tout produit défectueux.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article 7 - Protection des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les informations recueillies font l'objet d'un traitement informatique 
                destiné à la gestion des commandes. Vous disposez d'un droit d'accès, 
                de rectification et de suppression des données vous concernant.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article 8 - Droit applicable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les présentes conditions générales sont soumises au droit français. 
                Tout litige sera de la compétence exclusive des tribunaux français.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Dernière mise à jour : 1er janvier 2024</p>
        </div>
      </div>
    </div>
  );
}
