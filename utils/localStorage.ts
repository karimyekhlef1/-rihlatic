type StorageKeys = {
  token: string;
};

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const storageUtils = {
  setToken: (token: string): void => {
    try {
      if (typeof window !== 'undefined' && token) {
        localStorage.setItem(TOKEN_KEY, token);
        console.log('Token stored successfully');
      }
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  getToken: (): string | null => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(TOKEN_KEY);
        console.log('Retrieved token:', token ? 'exists' : 'null');
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  setUser: (user: any): void => {
    try {
      if (typeof window !== 'undefined' && user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error storing user:', error);
    }
  },

  getUser: (): any | null => {
    try {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  clearAuth: (): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },

  removeToken: (): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        console.log('Token removed successfully');
      }
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  clearStorage: (): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        console.log('Storage cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
