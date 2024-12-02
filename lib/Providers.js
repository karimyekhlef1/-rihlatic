'use client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthProvider from '@/context/AuthProvieder';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
