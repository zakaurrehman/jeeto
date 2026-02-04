export interface Prize {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  marketValue: number;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
  buyersCount: number;
  drawDate: string;
  status: 'active' | 'closed' | 'drawn';
  category: 'tech' | 'car' | 'luxury';
}

export interface Ticket {
  id: string;
  prizeId: string;
  userId: string;
  ticketNumber: string;
  purchaseDate: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  tickets: Ticket[];
}

export type PaymentMethod =
  | 'jazzcash'
  | 'easypaisa'
  | 'visa'
  | 'mastercard'
  | 'applepay';

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  imageUrl: string;
  prize: string;
}
