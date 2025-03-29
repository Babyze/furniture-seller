import { Pagination } from './pagination.model';

export interface Attribute {
  attributeName: string;
  attributeValue: string;
}

export interface SKU {
  price: number;
  quantity: number;
}

export interface SPU {
  name: string;
  attributes: Attribute[];
  sku: SKU;
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
}

export interface CreateProductSPU {
  name: string;
  sku: SKU;
}

export interface CreateProduct {
  name: string;
  description: string;
  measurements: string;
  categoryId: number;
  categoryAreaId: number;
  spus: CreateProductSPU[];
}

export type ProductListResponse = Pagination<Product>;
