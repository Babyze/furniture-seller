import { API_ROUTES } from '@src/constants/api-routes.constant';
import { ProductListResponse } from '@src/models/product.model';
import { api } from './axios';

class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProducts(
    page: number,
    limit: number,
    filters?: Record<string, unknown>,
  ): Promise<ProductListResponse> {
    return api.get<ProductListResponse>(API_ROUTES.PRODUCT.LIST, {
      params: { page, size: limit, ...filters },
    });
  }
}

export const productService = ProductService.getInstance();
