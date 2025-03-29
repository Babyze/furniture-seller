export const API_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/seller/auth/signin',
    LOGOUT: '/seller/auth/signout',
    REFRESH_TOKEN: '/seller/auth/refresh-token',
  },
  PRODUCT: {
    LIST: '/seller/products',
    CREATE: '/seller/products',
    GET_BY_ID: (id: number) => `/seller/products/${id}`,
    GET_SPUS: (id: number) => `/seller/products/${id}/spus`,
    GET_IMAGE: (id: number) => `/seller/products/${id}/images`,
    UPLOAD_IMAGE: (id: number) => `/seller/products/${id}/images`,
    UPDATE: (id: number) => `/seller/products/${id}`,
    DELETE_IMAGE: (id: number) => `/seller/products/${id}/images`,
  },
  CATEGORY: {
    LIST: '/seller/categories',
  },
  CATEGORY_AREA: {
    LIST: '/seller/category-areas',
  },
};
