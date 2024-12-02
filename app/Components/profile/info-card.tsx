import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAccountData } from '@/lib/store/api/account/accountSlice';
import { AppDispatch } from '@/lib/store/store';
import { Loader2 } from 'lucide-react';

interface User {
  id: number;
  email: string;
  avatar: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
}

interface RootState {
  account: {
    loading: boolean;
    accountData: User | null;
    error: string | null;
  };
}

export default function InfoCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { accountData, loading, error } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(fetchAccountData());
  }, [dispatch]);

  if (loading) {
    return <Loader2 className='animate-spin text-gray-600' size={40}/>;
  }

  if (error) {
    return <div>Error loading account data</div>;
  }

  if (!accountData) {
    return <div>No account data available</div>;
  }

  return (
    <div className="flex gap-4 items-center">
      <Avatar>
        <AvatarImage src={accountData.avatar} />
        <AvatarFallback>{accountData.email?.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="text-black text-lg font-semibold">
        {accountData.email}
      </span>
    </div>
  );
}
