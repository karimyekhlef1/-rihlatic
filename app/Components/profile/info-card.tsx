import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
export default function InfoCard() {
  const accountState = useSelector((state: any) => state.account)
  return (
    <div className="flex gap-4 items-center ">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>  {accountState.email.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="text-black text-lg font-semibold">
       {accountState.email}
      </span>
    </div>
  );
}
