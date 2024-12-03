import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploadButton } from '@/components/ui/file-upload-button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store/store';
import { fetchAccountData, updateAvatar } from '@/lib/store/api/account/accountSlice';
import { toast } from 'sonner';

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

  const handleFileSelect = async (file: File) => {
    // Check file size (1MB = 1024 * 1024 bytes)
    if (file.size > 1024 * 1024) {
      toast.error('File too large. Please select a file smaller than 1MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type. Please select an image file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await dispatch(updateAvatar(formData)).unwrap();
      
      if (response.success === true) {
        toast.success(response.message || 'Avatar updated successfully!');
        // Refresh account data to get the new avatar
        dispatch(fetchAccountData());
      } else {
        console.error('Invalid response:', response);
        toast.error(response.message || 'Failed to update avatar');
      }
    } catch (err: any) {
      console.error('Avatar upload error:', err);
      const errorMessage = err?.response?.data?.message || err.message || 'Failed to update avatar';
      toast.error(`Failed to update avatar: ${errorMessage}`);
    }
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
