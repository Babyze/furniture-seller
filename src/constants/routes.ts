export const ROUTES = {
  // Auth routes
  AUTH: {
    SIGN_IN: '/sign-in',
  },

  // Dashboard routes
  DASHBOARD: {
    ROOT: '/',
    PRODUCTS: '/products',
    CREATE_PRODUCT: '/products/create',
    UPDATE_PRODUCT: `/products/:id`,
    ORDERS: '/orders',
    CUSTOMERS: '/customers',
    SETTINGS: '/settings',
  },

  // All others
  NOT_FOUND: '*',
};
