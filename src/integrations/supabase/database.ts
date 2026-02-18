// Types ajustés pour correspondre à votre schéma étendu
export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

// Type pour les commandes basé sur votre schéma
export interface Order {
  id: string;
  created_at: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | null;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | null;
  tracking_number: string | null;
  user_id: string | null;
}

// Type pour les articles de commande
export interface OrderItem {
  id: string;
  order_id: string | null;
  product_id: string | null;
  quantity: number;
  price: number;
  color: string;
  size: string;
}
