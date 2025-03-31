import { PaginationRequestQuery } from './pagination.model';

export interface OrderForm {
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface OrderItem {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: number;
  customerId: number;
  totalPrice: string;
  status: 'shipped' | 'confirmed';
  createdDate: string;
  updatedDate: string;
  address: string;
  phoneNumber: string;
  fullName: string;
}
export type GetOrdersQuery = PaginationRequestQuery;
