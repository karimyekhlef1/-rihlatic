import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploadButton } from '@/components/ui/file-upload-button';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { updateField ,AccountState} from '@/lib/store/custom/mainSlices/accountSlice';
export default function ProfilePicture() {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<any>();
  const handleFileSelect = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    dispatch(updateField({ field: 'avatar', value: previewUrl }));
  };
  const accountState = useSelector((state: any) => state.account)

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
                 src={preview || accountState.avatar}
                 alt={accountState.firstName}/>
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
