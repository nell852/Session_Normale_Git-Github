import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmation() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Commande confirmée</h1>
        <p className="text-muted-foreground mb-6">
          Merci pour votre commande ! Une facture a été envoyée à votre adresse email.
        </p>
        <Button asChild>
          <Link to="/products">Retourner à la boutique</Link>
        </Button>
      </div>
    </div>
  );
}
