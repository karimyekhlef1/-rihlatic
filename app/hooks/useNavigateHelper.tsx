import { useRouter } from "next/navigation";

interface UseNavigateHelperProps {
  onSearch?: () => Promise<void>; // Mark `onSearch` as optional
}

export const useNavigateHelper = ({ onSearch }: UseNavigateHelperProps) => {
  const router = useRouter();

  const handleClickExplore = async (redirect: string) => {
    if (onSearch) {
        console.log("---yes-p[-")
       onSearch(); 
    }
    router.push(redirect); // Navigate after search
  };

  return { handleClickExplore };
};
