import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function CartDrawer() {
  const { state, closeCart, updateQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();

  // Fonction de formatage des prix en XAF
  const formatPriceXAF = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              {t('cart.title')}
              {state.itemCount > 0 && <Badge variant="secondary">{state.itemCount}</Badge>}
            </h2>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('cart.empty')}</h3>
                <p className="text-muted-foreground">
                  Ajoutez des produits pour commencer vos achats
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {state.items.map((item) => {
                  const price =
                    item.product?.on_sale && item.product?.sale_price
                      ? item.product.sale_price
                      : item.product?.price || 0;
                  return (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        {item.product?.images?.[0] && (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.product?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Taille: {item.size} • Couleur: {item.color}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-medium">{formatPriceXAF(price)}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 p-0 h-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              {t('cart.remove')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>{t('cart.total')}</span>
                <span>{formatPriceXAF(state.total)}</span>
              </div>
              {/* Bouton "Commander" supprimé ici */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
