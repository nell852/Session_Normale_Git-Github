-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE address_type AS ENUM ('billing', 'shipping');

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  parent_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create brands table
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  on_sale BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES public.categories(id),
  brand_id UUID REFERENCES public.brands(id),
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create addresses table
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type address_type NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'France',
  phone TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, size, color)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  payment_status payment_status DEFAULT 'pending',
  payment_method TEXT,
  shipping_address_id UUID REFERENCES public.addresses(id),
  billing_address_id UUID REFERENCES public.addresses(id),
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create promotions table
CREATE TABLE public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('percentage', 'fixed')) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  min_order_amount DECIMAL(10,2),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security for main tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Insert sample categories, brands, products, promotions
-- [Garde la même logique que dans ton script actuel]

-- Create product reviews table
CREATE TABLE public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create product specifications table
CREATE TABLE public.product_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for reviews and specifications
CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_rating ON public.product_reviews(rating);
CREATE INDEX idx_product_specifications_product_id ON public.product_specifications(product_id);

-- === AJOUT DES NOUVELLES TABLES ===

-- Admin notifications table
CREATE TABLE public.admin_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT admin_notifications_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Store settings table
CREATE TABLE public.store_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  store_name TEXT NOT NULL DEFAULT 'Mon E-commerce',
  store_description TEXT,
  store_email TEXT,
  store_phone TEXT,
  store_address TEXT,
  currency TEXT NOT NULL DEFAULT 'XAF',
  tax_rate NUMERIC DEFAULT 0,
  shipping_fee NUMERIC DEFAULT 0,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT store_settings_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- User roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role)
) TABLESPACE pg_default;


-- =========================
-- Sample data
-- =========================

-- Categories
INSERT INTO public.categories (name, slug, description) VALUES 
('Polos', 'polos', 'Collection de polos premium'),
('T-shirts', 't-shirts', 'Collection de t-shirts confortables'),
('Nouveautés', 'nouveautes', 'Dernières nouveautés'),
('Promotions', 'promotions', 'Articles en promotion');

-- Brands
INSERT INTO public.brands (name, slug, description) VALUES 
('StyleThread', 'stylethread', 'Marque premium de vêtements'),
('ClassicWear', 'classicwear', 'Vêtements classiques et intemporels');

-- Products
INSERT INTO public.products (name, description, price, sale_price, on_sale, images, category_id, brand_id, sizes, colors, stock, featured) VALUES 
(
  'Polo Classique Homme',
  'Polo en coton premium avec col classique. Parfait pour un look décontracté chic.',
  49.99,
  39.99,
  true,
  ARRAY['/placeholder.svg'],
  (SELECT id FROM public.categories WHERE slug = 'polos' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'stylethread' LIMIT 1),
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Blanc', 'Noir', 'Bleu', 'Rouge'],
  50,
  true
),
(
  'T-shirt Essential',
  'T-shirt basique en coton bio, coupe ajustée. Un indispensable de votre garde-robe.',
  29.99,
  NULL,
  false,
  ARRAY['/placeholder.svg'],
  (SELECT id FROM public.categories WHERE slug = 't-shirts' LIMIT 1),
  (SELECT id FROM public.brands WHERE slug = 'stylethread' LIMIT 1),
  ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Blanc', 'Noir', 'Gris', 'Beige'],
  100,
  true
);

-- Promotions
INSERT INTO public.promotions (name, code, type, value, min_order_amount, start_date, end_date, is_active) VALUES 
('Bienvenue 10%', 'WELCOME10', 'percentage', 10.00, 50.00, now(), now() + interval '30 days', true);

-- Product Reviews
INSERT INTO public.product_reviews (product_id, rating, title, comment, verified_purchase, created_at) VALUES
((SELECT id FROM public.products LIMIT 1), 5, 'Excellent qualité', 'Excellent produit, la qualité est au rendez-vous. Très satisfait de mon achat.', true, now() - interval '2 days'),
((SELECT id FROM public.products LIMIT 1), 4, 'Très bon rapport qualité-prix', 'Produit conforme à mes attentes, livraison rapide.', true, now() - interval '5 days'),
((SELECT id FROM public.products LIMIT 1), 5, 'Je recommande', 'Parfait, exactement ce que je cherchais. La taille correspond bien.', true, now() - interval '1 week');

-- Product Specifications
INSERT INTO public.product_specifications (product_id, category, name, value, display_order) VALUES
((SELECT id FROM public.products LIMIT 1), 'materials', 'Tissu', '100% coton premium', 1),
((SELECT id FROM public.products LIMIT 1), 'materials', 'Traitement', 'Anti-boulochage', 2),
((SELECT id FROM public.products LIMIT 1), 'care', 'Lavage', 'Machine 30°C', 1),
((SELECT id FROM public.products LIMIT 1), 'care', 'Séchage', 'À plat recommandé', 2);
