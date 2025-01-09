"use client";

import { useRouter } from "next/navigation";

export const useNavigateHelper = () => {
    const router = useRouter();

     const handleClickExplore = (redirect: string) => {
        router.push(redirect);
    };

    return { handleClickExplore };

};
