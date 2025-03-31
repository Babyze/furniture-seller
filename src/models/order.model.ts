import { ORDER_STATUS } from '@src/constants/order.constant';
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
  status: ORDER_STATUS;
  createdDate: string;
  updatedDate: string;
  address: string;
  phoneNumber: string;
  fullName: string;
}
export type GetOrdersQuery = PaginationRequestQuery;

export interface UpdateOrderBodyDto {
  status: ORDER_STATUS;
}
