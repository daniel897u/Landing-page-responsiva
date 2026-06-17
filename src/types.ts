export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'entradas' | 'principais' | 'acompanhamentos' | 'sobremesas';
  tags: string[];
  allergens?: string[];
  imageUrl?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  area: 'salao_principal' | 'jardim' | 'forno_lenha';
  notes?: string;
  status: 'confirmada' | 'pendente';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  location?: string;
  rating: number;
  comment: string;
  date: string;
  isUserAdded?: boolean;
}
