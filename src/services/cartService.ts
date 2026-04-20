import { storeApiClient, setStoreApiNonce } from './apiClient';

export const cartService = {
  /**
   * Fetch current cart from WooCommerce
   * This uses the Store API which is persistent for logged-in users
   */
  getCart: async () => {
    try {
      const response = await storeApiClient.get('/cart');
      
      console.log('--- ALL RESPONSE HEADERS ---', response.headers);

      // Capture the Nonce from various possible header names
      const nonce = response.headers?.nonce || 
                    response.headers?.['Nonce'] || 
                    response.headers?.['x-wc-store-api-nonce'] ||
                    response.headers?.['X-WC-Store-API-Nonce'];

      if (nonce) {
        setStoreApiNonce(nonce);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Fetch Cart Error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Add item to persistent cart
   */
  addToCart: async (productId: number, quantity: number = 1, variationId?: number, variationAttributes?: any[]) => {
    try {
      console.log('--- cartService.addToCart --- Received Attrs:', variationAttributes);
      const data: any = {
        id: productId.toString(),
        quantity: quantity.toString(),
      };
      
      if (variationId) {
        data.variation_id = variationId.toString();
      }

      if (variationAttributes && variationAttributes.length > 0) {
        data.variation = variationAttributes.map((v: any) => ({
           // Try to use attribute_slug if available, fallback to attribute name
           attribute: v.slug ? (v.slug.startsWith('attribute_') ? v.slug : `attribute_${v.slug}`) : v.attribute,
           value: v.value
        }));
        console.log('--- cartService.addToCart --- Final Variation Data:', data.variation);
      }

      const response = await storeApiClient.post('/cart/items', data);
      
      const nonce = response.headers?.nonce || response.headers?.['Nonce'] || response.headers?.['nonce'];
      if (nonce) {
        setStoreApiNonce(nonce);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Add to Cart API Error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Update item quantity
   */
  updateItem: async (key: string, quantity: number) => {
    try {
      const response = await storeApiClient.post(`/cart/items/${key}`, {
        quantity: quantity,
      });
      return response.data;
    } catch (error: any) {
      console.error('Update Cart Item Error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Remove item from cart
   */
  removeItem: async (key: string) => {
    try {
      const response = await storeApiClient.delete(`/cart/items/${key}`);
      return response.data;
    } catch (error: any) {
      console.error('Remove Cart Item Error:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Clear entire cart
   */
  clearCart: async () => {
    try {
      const response = await storeApiClient.delete('/cart/items');
      return response.data;
    } catch (error: any) {
      console.error('Clear Cart Error:', error.response?.data || error.message);
      throw error;
    }
  },
};
