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
    UPLOAD_IMAGE: (id: number) => `/seller/products/${id}/images`,
  },
  CATEGORY: {
    LIST: '/seller/categories',
  },
  CATEGORY_AREA: {
    LIST: '/seller/category-areas',
  },
};
