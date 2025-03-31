import { API_ROUTES } from '@src/constants/api-routes.constant';
import { CreateProduct, Product, ProductListResponse, SPU } from '@src/models/product.model';
import { api } from './axios';
import envConfig from '@src/config/env.config';

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

  async getProductById(id: number): Promise<Product> {
    const data = await api.get<Product>(API_ROUTES.PRODUCT.GET_BY_ID(id));
    if (data.imageUrl) data.imageUrl = `${envConfig.api.imageUrl}/${data.imageUrl}`;
    return data;
  }

  async getProductSPUs(id: number): Promise<SPU[]> {
    return api.get<SPU[]>(API_ROUTES.PRODUCT.GET_SPUS(id));
  }

  async createProduct(product: CreateProduct): Promise<Product> {
    return api.post<Product>(API_ROUTES.PRODUCT.CREATE, product);
  }

  async updateProduct(id: number, product: CreateProduct): Promise<Product> {
    return api.put<Product>(API_ROUTES.PRODUCT.UPDATE(id), product);
  }

  async getSPUs(productId: number): Promise<SPU[]> {
    return api.get<SPU[]>(API_ROUTES.PRODUCT.GET_SPUS(productId));
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

  async deleteProductImage(productId: number): Promise<void> {
    await api.delete(API_ROUTES.PRODUCT.DELETE_IMAGE(productId));
  }
}

export const productService = ProductService.getInstance();
