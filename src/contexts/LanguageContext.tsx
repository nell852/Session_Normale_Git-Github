
import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    'nav.account': 'Mon compte',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'nav.logout': 'Déconnexion',
    
    // Home
    'home.title': 'Collection de Polos & T-Shirts Premium',
    'home.subtitle': 'Découvrez notre sélection de vêtements de qualité supérieure',
    'home.featured': 'Produits Vedettes',
    'home.newArrivals': 'Nouveautés',
    'home.onSale': 'En Promotion',
    
    // Products
    'products.title': 'Nos Produits',
    'products.filter': 'Filtrer',
    'products.sort': 'Trier par',
    'products.sortBy.newest': 'Plus récents',
    'products.sortBy.priceAsc': 'Prix croissant',
    'products.sortBy.priceDesc': 'Prix décroissant',
    'products.sortBy.name': 'Nom',
    'products.addToCart': 'Ajouter au panier',
    'products.outOfStock': 'Rupture de stock',
    'products.sale': 'Promo',
    
    // Cart
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.total': 'Total',
    'cart.checkout': 'Commander',
    'cart.remove': 'Supprimer',
    'cart.quantity': 'Quantité',
    
    // Forms
    'form.email': 'Email',
    'form.password': 'Mot de passe',
    'form.firstName': 'Prénom',
    'form.lastName': 'Nom',
    'form.phone': 'Téléphone',
    'form.address': 'Adresse',
    'form.city': 'Ville',
    'form.postalCode': 'Code postal',
    'form.country': 'Pays',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.save': 'Enregistrer',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.account': 'My Account',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    
    // Home
    'home.title': 'Premium Polo & T-Shirt Collection',
    'home.subtitle': 'Discover our selection of superior quality clothing',
    'home.featured': 'Featured Products',
    'home.newArrivals': 'New Arrivals',
    'home.onSale': 'On Sale',
    
    // Products
    'products.title': 'Our Products',
    'products.filter': 'Filter',
    'products.sort': 'Sort by',
    'products.sortBy.newest': 'Newest',
    'products.sortBy.priceAsc': 'Price: Low to High',
    'products.sortBy.priceDesc': 'Price: High to Low',
    'products.sortBy.name': 'Name',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.sale': 'Sale',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',
    
    // Forms
    'form.email': 'Email',
    'form.password': 'Password',
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.phone': 'Phone',
    'form.address': 'Address',
    'form.city': 'City',
    'form.postalCode': 'Postal Code',
    'form.country': 'Country',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.save': 'Save',
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'fr';
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
