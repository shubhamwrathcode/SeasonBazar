import { authApiClient, wcApiClient } from './apiClient';

/**
 * Service for Authentication operations (Login / JWT)
 * Note: Usually requires 'JWT Authentication for WP-API' plugin installed.
 */
export const authService = {
  /**
   * Login User and Get JWT Token
   * @param credentials - username (email), password
   * @returns JWT Token Data { token, user_id, user_email, ... }
   */
  login: async (credentials: any) => {
    try {
      // Endpoint typically is '/token' assuming base is '.../jwt-auth/v1'
      const response = await authApiClient.post('/token', credentials);
      return response.data;
    } catch (error: any) {
      console.error('Login Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  /**
   * Validate current token status
   */
  validateToken: async (token: string) => {
    try {
      const response = await authApiClient.post('/token/validate', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  /**
   * Request password reset email from backend
   */
  async forgotPassword(email: string) {
    try {
      // Backend developer needs to create this custom endpoint: /wp-json/seasonbazar/v1/forgot-password
      const response = await wcApiClient.post('/seasonbazar/v1/forgot-password', {
        user_login: email,
      });
      return response.data;
    } catch (error: any) {
      console.log('Forgot Password API Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },
};
