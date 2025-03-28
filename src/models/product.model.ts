import { Pagination } from './pagination.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  measurements: string;
  sellerId: number;
  categoryId: number;
  categoryAreaId: number;
  createdDate: string;
  updatedDate: string;
  stock: string;
  categoryName: string;
  categoryAreaName: string;
}

export type ProductListResponse = Pagination<Product>;
