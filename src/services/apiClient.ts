import axios from 'axios';
import { API_CONFIG } from './apiConfig';

/**
 * Standard WooCommerce API Client with Basic Auth
 * Handles Product, Customer, Order CRUD operations
 */
export const wcApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  params: {
    consumer_key: API_CONFIG.CONSUMER_KEY,
    consumer_secret: API_CONFIG.CONSUMER_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Standard WordPress API Client for Authentication (JWT)
 * Handles Login and Token-based operations
 */
export const authApiClient = axios.create({
  baseURL: API_CONFIG.JWT_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for attaching JWT Token to authApiClient if needed later
authApiClient.interceptors.request.use(async (config) => {
  // If you store token in AsyncStorage, retrieve it here and attach to headers
  // const token = await AsyncStorage.getItem('userToken');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});
