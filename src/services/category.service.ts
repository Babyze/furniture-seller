import { API_ROUTES } from '@src/constants/api-routes.constant';
import { api } from './axios';
import { CategoryListResponse } from '@src/models/category.model';

class CategoryService {
  private static instance: CategoryService;

  private constructor() {}

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async getCategories(): Promise<CategoryListResponse> {
    return api.get<CategoryListResponse>(API_ROUTES.CATEGORY.LIST);
  }
}

export const categoryService = CategoryService.getInstance();
