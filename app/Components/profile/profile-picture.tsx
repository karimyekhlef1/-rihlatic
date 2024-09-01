import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ProfilePicture() {
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
                <AvatarImage />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-start">
              <p className="box-content px-4 font-medium text-[12px] w-[250px] h-[40px] text-gray-500">
                Brighten up your profile with a favorite photo or avatar. 1 MB
                maximum file size.
              </p>
              <div className="pt-2 px-4">
                <Button variant={'secondary'} className="h-[36px] w-[102px]">
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
