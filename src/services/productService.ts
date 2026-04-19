import { wcApiClient } from './apiClient';

/**
 * Service for Product, Category, Review and Order operations in WooCommerce
 */
export const productService = {
  /**
   * List all products
   */
  getProducts: async (params = {}) => {
    try {
      const response = await wcApiClient.get('/products', { params: {
        ...params,
        status: 'publish',
      } });
      return response.data;
    } catch (error: any) {
      console.error('Get Products Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Get a single product details
   */
  getProductById: async (productId: number) => {
    try {
      const response = await wcApiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get Product Detail Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * List all categories
   */
  getCategories: async (params = {}) => {
    try {
      const response = await wcApiClient.get('/products/categories', { params });
      return response.data;
    } catch (error: any) {
      console.error('Get Categories Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * List reviews for a product
   */
  getProductReviews: async (productId: number) => {
    try {
      const response = await wcApiClient.get('/products/reviews', { params: { product: productId } });
      return response.data;
    } catch (error: any) {
      console.error('Get Reviews Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Create a new order
   */
  createOrder: async (orderData: any) => {
    try {
      const response = await wcApiClient.post('/orders', orderData);
      return response.data;
    } catch (error: any) {
      console.error('Create Order Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Get orders for a specific customer
   */
  getOrders: async (customerId: number) => {
    try {
      const response = await wcApiClient.get('/orders', { params: { customer: customerId } });
      return response.data;
    } catch (error: any) {
      console.error('Get Orders Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Search products
   */
  searchProducts: async (searchTerm: string) => {
    try {
      const response = await wcApiClient.get('/products', {
        params: { search: searchTerm, status: 'publish' }
      });
      return response.data;
    } catch (error: any) {
       console.error('Search Products Error:', error.response?.data || error.message);
       throw error.response?.data || error;
    }
  }
};
