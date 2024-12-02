'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storageUtils } from '@/utils/localStorage';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';

export function withAuth(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { success } = useSelector((state: RootState) => state.signIn);
    
    useEffect(() => {
      const token = storageUtils.getToken();
      if (!token || !success) {
        router.push('/'); // Redirect to home page or login page
      }
    }, [router, success]);

    // If we have a token, render the protected component
    const token = storageUtils.getToken();
    if (!token || !success) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}
