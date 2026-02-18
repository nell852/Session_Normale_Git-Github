import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-navy text-blue-900 dark:text-brand-dark-midnight mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-blue text-white p-2 rounded-lg">
                <span className="font-bold text-xl">ST</span>
              </div>
              <span className="font-bold text-xl text-blue-800 dark:text-blue-800">
                StyleThread
              </span>
            </div>
            <p className="text-blue-900 dark:text-brand-dark-midnight">
              Votre destination pour des polos et t-shirts de qualité premium. Style, confort et
              durabilité réunis.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-800">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  Tous les Produits
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=polos"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  Polos
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=tshirts"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/products?sale=true"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  Promotions
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-800">
              Service Client
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  Nous Contacter
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  Livraison
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  Retours & Échanges
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white transition-colors"
                >
                  Guide des Tailles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-800">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-900 dark:text-brand-dark-midnight" />
                <span className="text-blue-900 dark:text-brand-dark-midnight">
                  nyogognell@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-900 dark:text-brand-dark-midnight" />
                <span className="text-blue-900 dark:text-brand-dark-midnight">
                  +237 698 948 425
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-900 dark:text-brand-dark-midnight" />
                <span className="text-blue-900 dark:text-brand-dark-midnight">
                  Yaoundé, Cameroun
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900 dark:border-brand-dark-midnight mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-900 dark:text-brand-dark-midnight text-sm">
              © 2025 StyleThread. Tous droits réservés.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white text-sm transition-colors"
              >
                Politique de Confidentialité
              </Link>
              <Link
                to="/terms"
                className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white text-sm transition-colors"
              >
                Conditions d'Utilisation
              </Link>
              <Link
                to="/cookies"
                className="text-blue-900 hover:text-white dark:text-brand-dark-midnight dark:hover:text-white text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
