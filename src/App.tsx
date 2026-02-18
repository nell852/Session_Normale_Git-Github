import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Index from './pages/Index';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import SizeGuide from './pages/SizeGuide';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OrderConfirmation from './pages/OrderConfirmation';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  // Initialiser EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-confirmation" element={<OrderConfirmation />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/shipping" element={<Shipping />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/size-guide" element={<SizeGuide />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <CartDrawer />
                </div>
              </BrowserRouter>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
