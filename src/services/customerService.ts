import { wcApiClient } from './apiClient';

/**
 * Service for Customer Operations in WooCommerce
 * Reference Documentation: https://woocommerce.github.io/woocommerce-rest-api-docs/#customers
 */
export const customerService = {
  /**
   * Register/Create a New Customer
   * @param customerData - email, password, first_name, last_name, billboard etc.
   * @returns Created Customer Data
   */
  createCustomer: async (customerData: any) => {
    try {
      const response = await wcApiClient.post('/customers', customerData);
      return response.data;
    } catch (error: any) {
      console.error('Create Customer Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Get Customer Details by ID
   * @param customerId - WooCommerce ID
   */
  getCustomer: async (customerId: number) => {
    try {
      const response = await wcApiClient.get(`/customers/${customerId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update Customer Profile
   */
  updateCustomer: async (customerId: number, updateData: any) => {
    try {
      const response = await wcApiClient.put(`/customers/${customerId}`, updateData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  /**
   * List all Customers (useful for admin-level logic)
   */
  listCustomers: async (params = {}) => {
    try {
      const response = await wcApiClient.get('/customers', { params });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};
