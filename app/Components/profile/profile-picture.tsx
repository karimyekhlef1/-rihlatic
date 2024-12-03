import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploadButton } from '@/components/ui/file-upload-button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store/store';
import { fetchAccountData } from '@/lib/store/api/account/accountSlice';

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

export default function ProfilePicture() {
  const dispatch = useDispatch<AppDispatch>();
  const { accountData, loading, error } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(fetchAccountData());
  }, [dispatch]);

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file);
  };

  return (
    <div className="px-10">
      <Card className="w-[300px] sm:w-full">
        <CardContent className="flex flex-col">
          <div className="flex">
            <h1 className="font-semibold pt-3 justify-start">
              Profile picture
            </h1>
          </div>
          <div className="flex items-center justify-center sm:items-start sm:justify-start flex-row pt-6">
            <div>
              <Avatar className="hidden sm:block w-20 h-20">
                <AvatarImage 
                 src={accountData?.avatar}
                 alt={accountData?.username}/>
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-start">
              <p className="box-content px-4 font-medium text-[12px] w-[250px] h-[40px] text-gray-500">
                Brighten up your profile with a favorite photo or avatar. 1 MB
                maximum file size.
              </p>
              <div className="pt-2 px-4">
                <FileUploadButton
                  onFileSelect={handleFileSelect}
                  label="Upload"
              
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
