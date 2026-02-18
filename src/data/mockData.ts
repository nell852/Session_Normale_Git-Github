
import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Polo Classic Premium Blanc',
    description: 'Polo en coton piqué premium avec finitions de qualité supérieure. Coupe ajustée et confortable.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500'
    ],
    category: 'polos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanc', 'Marine', 'Noir'],
    stock: 50,
    featured: true,
    on_sale: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'T-Shirt Coton Bio Marine',
    description: 'T-shirt en coton biologique certifié, doux et respectueux de l\'environnement.',
    price: 45.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    category: 'tshirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Marine', 'Blanc', 'Gris'],
    stock: 75,
    featured: false,
    on_sale: true,
    sale_price: 35.99,
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Polo Sport Performance Noir',
    description: 'Polo technique en polyester recyclé avec technologie anti-transpiration.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500'
    ],
    category: 'polos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Bleu', 'Rouge'],
    stock: 30,
    featured: true,
    on_sale: false,
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'T-Shirt Graphique Vintage',
    description: 'T-shirt avec imprimé vintage unique, coton 100% et coupe décontractée.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
    ],
    category: 'tshirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gris', 'Noir', 'Blanc'],
    stock: 40,
    featured: false,
    on_sale: true,
    sale_price: 29.99,
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Polo Luxe Collection Bleu',
    description: 'Polo de luxe en coton égyptien avec broderies artisanales et boutons nacre.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1594938328870-28965dc8f165?w=500',
      'https://images.unsplash.com/photo-1594938328870-28965dc8f165?w=500'
    ],
    category: 'polos',
    sizes: ['M', 'L', 'XL'],
    colors: ['Bleu', 'Blanc', 'Marine'],
    stock: 15,
    featured: true,
    on_sale: false,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'T-Shirt Basic Essential Blanc',
    description: 'T-shirt basique indispensable, coupe parfaite et qualité durable.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500'
    ],
    category: 'tshirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blanc', 'Noir', 'Gris', 'Marine'],
    stock: 100,
    featured: false,
    on_sale: false,
    created_at: '2024-01-06T00:00:00Z',
    updated_at: '2024-01-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Polo Rayé Casual Rouge',
    description: 'Polo à rayures classiques pour un look décontracté et élégant.',
    price: 65.99,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    category: 'polos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rouge', 'Bleu', 'Vert'],
    stock: 25,
    featured: false,
    on_sale: true,
    sale_price: 52.99,
    created_at: '2024-01-07T00:00:00Z',
    updated_at: '2024-01-07T00:00:00Z'
  },
  {
    id: '8',
    name: 'T-Shirt Oversize Tendance',
    description: 'T-shirt oversize dans l\'air du temps, parfait pour un style streetwear.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1503341338985-a4cf1bd6ecad?w=500',
      'https://images.unsplash.com/photo-1503341338985-a4cf1bd6ecad?w=500'
    ],
    category: 'tshirts',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Noir', 'Gris', 'Blanc'],
    stock: 35,
    featured: true,
    on_sale: false,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z'
  }
];
