import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        <p className="text-muted-foreground mb-6">
          Chez StyleThreads, la protection de vos données personnelles est notre priorité absolue.
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Collecte des informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous collectons des informations lorsque vous vous inscrivez sur notre site,
                  passez une commande, vous abonnez à notre newsletter ou remplissez un formulaire.
                </p>
                <p>
                  Les informations collectées incluent votre nom, votre adresse e-mail, votre
                  adresse postale, votre numéro de téléphone et vos préférences de style.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Utilisation des informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>Les informations que nous collectons peuvent être utilisées pour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personnaliser votre expérience sur notre site</li>
                  <li>Améliorer notre site web et nos services</li>
                  <li>Améliorer notre service client</li>
                  <li>Traiter vos commandes rapidement et efficacement</li>
                  <li>Vous envoyer des e-mails périodiques et des offres personnalisées</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Protection des informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous mettons en place diverses mesures de sécurité pour préserver la sécurité de
                  vos informations personnelles. Nos systèmes sont mis à jour régulièrement.
                </p>
                <p>
                  Nous utilisons un cryptage SSL sécurisé pour protéger les informations sensibles
                  transmises en ligne. Vos informations sont stockées sur des serveurs sécurisés certifiés ISO 27001.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. Ces
                  cookies nous aident à mémoriser vos préférences et à analyser l'utilisation de
                  notre site.
                </p>
                <p>
                  Vous pouvez désactiver les cookies dans votre navigateur, mais cela peut affecter
                  le fonctionnement de certaines parties de notre site. Un bandeau de consentement
                  vous permet de gérer vos préférences en matière de cookies.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Divulgation à des tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles
                  identifiables à des tiers sans votre consentement explicite.
                </p>
                <p>
                  Ceci n'inclut pas les tierces parties de confiance qui nous aident à exploiter
                  notre site web ou à mener nos affaires, tant que ces parties conviennent de garder
                  ces informations confidentielles.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Vos droits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification de vos données</li>
                  <li>Droit à l'effacement de vos données</li>
                  <li>Droit à la portabilité de vos données</li>
                  <li>Droit d'opposition au traitement</li>
                  <li>Droit de retirer votre consentement à tout moment</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Consentement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                En utilisant notre site, vous consentez à notre politique de confidentialité.
                Vous pouvez retirer votre consentement à tout moment en nous contactant.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Si vous avez des questions concernant cette politique de confidentialité, vous
                  pouvez nous contacter à :
                </p>
                <p>
                  Email : privacy@stylethread.com
                  <br />
                  Adresse : 123 Rue de la Mode, 75001 Paris, France
                  <br />
                  Téléphone : +33 1 23 45 67 89
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Dernière mise à jour : 18 février 2026</p>
        </div>
      </div>
    </div>
  );
}