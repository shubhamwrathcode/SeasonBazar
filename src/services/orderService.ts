import { wcApiClient } from './apiClient';

/**
 * Service for Order-related operations (Checkout, Order History)
 */
export const orderService = {
  /**
   * Create a new order (Checkout)
   * @param orderData - { payment_method, line_items, billing, shipping, customer_id }
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
   * @param customerId 
   */
  getCustomerOrders: async (customerId: number) => {
    try {
      const response = await wcApiClient.get('/orders', {
        params: { customer: customerId }
      });
      return response.data;
    } catch (error: any) {
      console.error('Get Customer Orders Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Get specific order details
   */
  getOrderDetails: async (orderId: number) => {
    try {
      const response = await wcApiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get Order Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }
};
