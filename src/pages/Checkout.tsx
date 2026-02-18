import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import emailjs from '@emailjs/browser';
import { supabase } from '@/integrations/supabase/client';

export default function Checkout() {
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const SHIPPING_FEE = 1000; // Frais de livraison en FCFA

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour formater le prix en XAF
  const formatPriceXAF = (price: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);

  // Calculer le total avec les frais de livraison
  const totalWithShipping = state.total + SHIPPING_FEE;

  // Fonction pour diminuer le stock d’un produit
  async function updateStock(productId: string, quantity: number) {
    // Récupérer stock actuel
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', productId)
      .single();

    if (productError) {
      throw new Error(`Erreur récupération stock produit ${productId}: ${productError.message}`);
    }

    const currentStock = productData?.stock ?? 0;
    const newStock = currentStock - quantity;

    if (newStock < 0) {
      throw new Error(`Stock insuffisant pour le produit ${productId}`);
    }

    // Mettre à jour le stock
    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', productId);

    if (updateError) {
      throw new Error(`Erreur mise à jour stock produit ${productId}: ${updateError.message}`);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mise à jour stock de chaque produit AVANT création commande
      for (const item of state.items) {
        if (!item.product?.id) continue;
        await updateStock(item.product.id, item.quantity);
      }

      // Préparation données commande
      const orderData = {
        total_amount: totalWithShipping, // Inclure les frais de livraison
        shipping_amount: SHIPPING_FEE,
        tax_amount: 0,
        payment_status: 'pending' as 'pending',
        payment_method: 'pending',
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Insérer la commande
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData as any])
        .select('id')
        .single();

      if (orderError) {
        throw new Error(`Erreur Supabase (orders): ${orderError.message}`);
      }

      // Insérer les articles de la commande
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        product_id: item.product?.id || null,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: (item.product?.on_sale && item.product?.sale_price)
          ? item.product.sale_price
          : item.product?.price || 0,
        created_at: new Date().toISOString(),
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw new Error(`Erreur Supabase (order_items): ${itemsError.message}`);
      }

      // Résumé de la commande pour les emails
      const orderSummary = state.items
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.product?.name} (${item.size}, ${item.color}) x${item.quantity}: ${formatPriceXAF(
              ((item.product?.on_sale && item.product?.sale_price)
                ? item.product.sale_price
                : item.product?.price || 0) * item.quantity
            )}`
        )
        .join('\n');

      // Paramètres pour email utilisateur
      const userEmailParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        order_summary: orderSummary,
        shipping_fee: formatPriceXAF(SHIPPING_FEE),
        total: formatPriceXAF(totalWithShipping),
        to_email: formData.email,
      };

      // Paramètres pour email admin
      const adminEmailParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        order_summary: orderSummary,
        shipping_fee: formatPriceXAF(SHIPPING_FEE),
        total: formatPriceXAF(totalWithShipping),
        to_email: 'nyogognell@gmail.com',
      };

      // Logs pour débogage
      console.log('userEmailParams:', userEmailParams);
      console.log('adminEmailParams:', adminEmailParams);

      // Envoyer email utilisateur avec modèle spécifique
      try {
        console.log('Envoi email utilisateur:', userEmailParams);
        await emailjs.send(
        'service_lt1rh5c',
        'template_mijdj1s', // Remplacez par l'ID réel du modèle client
        userEmailParams,
        'fPlwIN8-Jue0vhZba'
      );
        console.log('Email utilisateur envoyé avec succès');
      } catch (error) {
        console.error('Erreur envoi email utilisateur:', error);
        throw error;
      }

      // Envoyer email admin avec modèle existant
      try {
        console.log('Envoi email admin:', adminEmailParams);
        await emailjs.send(
        'service_lt1rh5c',
        'template_jeafy9e',
        adminEmailParams,
        'fPlwIN8-Jue0vhZba'
      );
        console.log('Email admin envoyé avec succès');
      } catch (error) {
        console.error('Erreur envoi email admin:', error);
        throw error;
      }

      toast({
        title: 'Commande validée',
        description: 'Votre commande a été confirmée.',
      });
      clearCart();
      navigate('/order-confirmation');

    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: (error as Error).message || 'Une erreur s\'est produite. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Validation de la commande</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nom complet
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Numéro de téléphone
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : 'Confirmer la commande'}
            </Button>
          </form>
        </div>

        {/* Résumé commande */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
            <div className="space-y-3 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.product?.name} ({item.size}, {item.color}) x{item.quantity}
                  </span>
                  <span>
                    {formatPriceXAF(
                      (item.product?.on_sale && item.product?.sale_price
                        ? item.product.sale_price
                        : item.product?.price || 0) * item.quantity
                    )}
                  </span>
                </div>
              ))}
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>{formatPriceXAF(SHIPPING_FEE)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPriceXAF(totalWithShipping)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}