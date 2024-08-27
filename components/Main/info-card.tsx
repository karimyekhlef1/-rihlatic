import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function InfoCard() {
  return (
    <div className="flex gap-4 items-center ">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
      <span className="text-black text-lg font-semibold">
        yakoubbatouche21@gmail.com
      </span>
    </div>
  );
}
