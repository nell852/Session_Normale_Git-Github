import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { jsPDF } from 'jspdf';

export default function Cart() {
  const { state, updateQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();
  const SHIPPING_FEE = 1000; // Frais de livraison en FCFA

  // Fonction de formatage des prix en XAF
  const formatPriceXAF = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculer le total avec les frais de livraison
  const totalWithShipping = state.total + SHIPPING_FEE;

  // Générer le PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Définir la police et le style
    doc.setFont('helvetica', 'normal');
    
    // En-tête
    doc.setFillColor(30, 58, 138); // Bleu foncé
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Style Threads - Panier', 20, 20);
    
    // Informations générales
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 40);
    
    // Tableau des articles
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Articles dans le panier', 20, 55);
    
    // En-têtes du tableau
    const startY = 65;
    doc.setFillColor(229, 231, 235); // Gris clair
    doc.rect(20, startY, 170, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('Article', 22, startY + 7);
    doc.text('Taille', 90, startY + 7);
    doc.text('Couleur', 110, startY + 7);
    doc.text('Quantité', 130, startY + 7);
    doc.text('Prix', 160, startY + 7, { align: 'right' });
    
    // Lignes du tableau
    let y = startY + 10;
    state.items.forEach((item, index) => {
      const price = (item.product?.on_sale && item.product?.sale_price)
        ? item.product.sale_price
        : item.product?.price || 0;
      const itemTotal = price * item.quantity;
      
      // Fond alterné pour les lignes
      if (index % 2 === 0) {
        doc.setFillColor(243, 244, 246); // Gris très clair
        doc.rect(20, y, 170, 10, 'F');
      }
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(item.product?.name || '', 22, y + 7, { maxWidth: 65 });
      doc.text(item.size, 90, y + 7);
      doc.text(item.color, 110, y + 7);
      doc.text(item.quantity.toString(), 130, y + 7);
      doc.text(formatPriceXAF(itemTotal), 180, y + 7, { align: 'right' });
      
      y += 10;
    });
    
    // Ligne de séparation
    doc.setDrawColor(30, 58, 138);
    doc.line(20, y + 5, 190, y + 5);
    
    // Sous-total et frais de livraison
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Sous-total', 150, y + 15, { align: 'right' });
    doc.text(formatPriceXAF(state.total), 180, y + 15, { align: 'right' });
    doc.text('Frais de livraison', 150, y + 25, { align: 'right' });
    doc.text(formatPriceXAF(SHIPPING_FEE), 180, y + 25, { align: 'right' });
    
    // Total
    doc.text('Total', 150, y + 35, { align: 'right' });
    doc.text(formatPriceXAF(totalWithShipping), 180, y + 35, { align: 'right' });
    
    // Pied de page
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('Merci pour votre confiance en Style Threads', 105, 280, { align: 'center' });
    doc.text('Contact: nyogognell@gmail.com | +237 698 849 425', 105, 287, { align: 'center' });
    
    // Télécharger le PDF
    doc.save('panier-style-threads.pdf');
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">
            Découvrez nos produits et ajoutez-les à votre panier
          </p>
          <Button asChild>
            <Link to="/products">Continuer mes achats</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex gap-4 p-6 border rounded-lg">
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                {item.product?.images?.[0] && (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                <p className="text-muted-foreground">
                  Taille: {item.size} • Couleur: {item.color}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      {formatPriceXAF((item.product?.on_sale && item.product?.sale_price) 
                        ? item.product.sale_price 
                        : item.product?.price || 0
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Sous-total ({state.itemCount} articles)</span>
                <span>{formatPriceXAF(state.total)}</span>
              </div>
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
            
            <Button className="w-full mb-4" size="lg" asChild>
              <Link to="/checkout">Passer la commande</Link>
            </Button>
            
            <Button variant="outline" className="w-full mb-4" onClick={generatePDF}>
              Télécharger le PDF
            </Button>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/products">Continuer mes achats</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}