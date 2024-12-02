'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { checkAuthState } from '@/lib/store/api/signin/signinSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isInitialized } = useSelector((state: RootState) => state.signIn);

  useEffect(() => {
    const initAuth = async () => {
      await dispatch(checkAuthState());
    };

    if (!isInitialized) {
      initAuth();
    }
  }, [dispatch, isInitialized]);

  // Optional: Show loading state while checking auth
  if (!isInitialized) {
    return <div>Loading...</div>; // Or your loading component
  }

  return <>{children}</>;
}
