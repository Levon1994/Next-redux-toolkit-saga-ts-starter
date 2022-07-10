import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = (): {
  getItem(_key: string): Promise<null>;
  setItem(_key: string, value: string): Promise<string>;
  removeItem(_key: string): Promise<void>;
} => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },

    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },

    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

export const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local');
