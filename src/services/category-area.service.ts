import { API_ROUTES } from '@src/constants/api-routes.constant';
import { CategoryAreaListResponse } from '@src/models/category-area.model';
import { api } from './axios';

class CategoryAreaService {
  private static instance: CategoryAreaService;

  private constructor() {}

  public static getInstance(): CategoryAreaService {
    if (!CategoryAreaService.instance) {
      CategoryAreaService.instance = new CategoryAreaService();
    }
    return CategoryAreaService.instance;
  }

  async getCategoryAreas(): Promise<CategoryAreaListResponse> {
    return api.get<CategoryAreaListResponse>(API_ROUTES.CATEGORY_AREA.LIST);
  }
}

export const categoryAreaService = CategoryAreaService.getInstance();
