import axios from 'axios';
import { API_CONFIG } from './apiConfig';
import { useAuthStore } from '../store/useAuthStore';

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
 * Standard WordPress API Client (Base /wp-json)
 */
export const wpApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL.replace('/wc/v3', ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * WooCommerce Store API Client
 */
export const storeApiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL.replace('/wc/v3', '/wc/store/v1'),
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

// Global Request Logger
const requestLogger = (config: any) => {
  console.log('--- API Request ---');
  console.log(`URL: ${config.baseURL}${config.url}`);
  console.log('Method:', config.method?.toUpperCase());
  if (config.data) console.log('Data:', JSON.stringify(config.data, null, 2));
  if (config.params) console.log('Params:', JSON.stringify(config.params, null, 2));
  return config;
};

// Global Error/Response Logger
const responseLogger = (response: any) => {
  console.log('--- API Response ---');
  console.log('Status:', response.status);
  console.log('Data:', JSON.stringify(response.data, null, 2));
  return response;
};

const errorLogger = (error: any) => {
  console.log('--- API Error ---');
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Error Data:', JSON.stringify(error.response.data, null, 2));
  } else {
    console.log('Message:', error.message);
  }
  return Promise.reject(error);
};

// Apply to WooCommerce Client
wcApiClient.interceptors.request.use(requestLogger);
wcApiClient.interceptors.response.use(responseLogger, errorLogger);

// Apply to WordPress Generic Client
wpApiClient.interceptors.request.use(requestLogger);
wpApiClient.interceptors.response.use(responseLogger, errorLogger);

// Global store for the Store API Nonce
let storeApiNonce: string | null = null;

export const setStoreApiNonce = (nonce: string) => {
  storeApiNonce = nonce;
  console.log('--- Store API Nonce Updated ---', nonce);
};

// Apply to Store API Client
storeApiClient.interceptors.request.use(async (config) => {
  requestLogger(config);
  
  // Attach user token from AuthStore to authorize persistent cart
  const { user } = useAuthStore.getState();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
    console.log('--- Attaching Bearer Token to Store API ---');
  }

  // Attach dynamic Nonce if we have one
  if (storeApiNonce) {
    config.headers['Nonce'] = storeApiNonce;
    config.headers['X-WC-Store-API-Nonce'] = storeApiNonce;
    console.log('--- ATTACHING NONCE TO REQUEST ---', storeApiNonce);
  } else {
    console.log('--- NO NONCE TO ATTACH ---');
  }
  
  return config;
});
storeApiClient.interceptors.response.use(responseLogger, errorLogger);

// Apply to Auth Client
authApiClient.interceptors.request.use(async (config) => {
  requestLogger(config);
  // Existing token logic
  // const token = await AsyncStorage.getItem('userToken');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});
authApiClient.interceptors.response.use(responseLogger, errorLogger);
