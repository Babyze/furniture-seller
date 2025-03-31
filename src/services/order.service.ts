import { API_ROUTES } from '@src/constants/api-routes.constant';
import { GetOrdersQuery, Order, UpdateOrderBodyDto } from '@src/models/order.model';
import { Pagination } from '@src/models/pagination.model';
import { api } from './axios';

class OrderService {
  private static instance: OrderService;

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  async getOrders(query: GetOrdersQuery): Promise<Pagination<Order>> {
    return api.get<Pagination<Order>>(API_ROUTES.ORDER.LIST, {
      params: query,
    });
  }

  async updateOrder(id: number, body: UpdateOrderBodyDto): Promise<void> {
    return api.put<void>(API_ROUTES.ORDER.UPDATE(id), body);
  }
}

export const orderService = OrderService.getInstance();
