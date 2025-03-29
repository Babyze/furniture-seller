import { API_ROUTES } from '@src/constants/api-routes.constant';
import { CreateProduct, Product, ProductListResponse } from '@src/models/product.model';
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
      params: { page, limit, ...filters },
    });
  }

  async createProduct(product: CreateProduct): Promise<Product> {
    return api.post<Product>(API_ROUTES.PRODUCT.CREATE, product);
  }

  async uploadProductImage(productId: number, image: File): Promise<void> {
    const formData = new FormData();
    formData.append('image', image);

    await api.put(API_ROUTES.PRODUCT.UPLOAD_IMAGE(productId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const productService = ProductService.getInstance();
