import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useDispatch } from 'react-redux';
import { setPasswordDialogOpen } from '@/lib/store/custom/mainSlices/dialogSlice';

import EditPassword from '@/app/Components/profile/edit-password';

export default function PasswordChange() {
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    dispatch(setPasswordDialogOpen(true));
  };
  return (
    <div className="pt-4 px-10">
      <Card className="w-[300px] sm:w-full">
        <CardContent className="flex flex-col">
          <div className="flex">
            <h1 className="font-semibold pt-3 pb-3 justify-start">
              Change password
            </h1>
          </div>
          <Separator />
          <div className="flex flex-row pt-6 items-center">
            <p className="px-4 font-medium text-[12px] w-[300px] h-[40px] text-gray-500">
              Change your password easily in one click.
            </p>
            <Button
              variant={'secondary'}
              className="h-[36px] w-[70px]"
              onClick={handleOpenDialog}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
      <div>
        <EditPassword />
      </div>
    </div>
  );
}
