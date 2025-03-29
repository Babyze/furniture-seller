import { Pagination } from './pagination.model';

export interface SKU {
  price: number;
  quantity: number;
}

export interface SPU {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

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
  imageUrl?: string | null;
  spus: SPU[];
}

export interface CreateProduct {
  name: string;
  description: string;
  measurements: string;
  categoryId: number;
  categoryAreaId: number;
  spus: SPU[];
}

export type ProductListResponse = Pagination<Product>;
