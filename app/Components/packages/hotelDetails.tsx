"use client"
import { Separator } from "@/components/ui/separator";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

export default function HotelDetails({data}:any) {
  const [uniqueIncludes , setUniqueIncludes] =  useState<string[]>([]);
  const [uniqueexcludes , setUniqueExcludes] =  useState<string[]>([]);
 
  useEffect(() => {
    if (data) {
      const allIncludes = data.flatMap((item: any) => item.includes || []);
      const allExcludes = data.flatMap((item: any) => item.excludes || []);
      setUniqueIncludes(Array.from(new Set(allIncludes)));
      setUniqueExcludes(Array.from(new Set(allExcludes)));
    }
  }, [data]);

  return (
    <div className="flex flex-col p-0">
      <div className="flex flex-wrap sm:gap-0 gap-3">
        <div className="flex flex-col w-full sm:w-1/2">
          <h3 className="font-semibold text-md">Inclus</h3>
          <ul className="list-none pl-0 mt-2">
            {uniqueIncludes?.map((item, index) => (
              <li
                key={item}
                className="flex items-center mb-1 font-semibold text-sm text-gray-500"
              >
                <CircleCheck
                  size={20}
                  className="font-semibold text-xs text-[#5eda7f] mr-2"
                  fill="#bff0cc"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <h3 className="font-semibold text-md">Non inclus</h3>
          <ul className="list-none pl-0 mt-2">
            <div className="flex flex-col"></div>
            {uniqueexcludes?.map((item, index) => (
              <li
                key={item}
                className="flex items-center mb-1 font-semibold text-sm text-gray-500"
              >
                <CircleX
                  size={20}
                  className="font-semibold text-xs text-[#ff0004] mr-2"
                  fill="#ff999b"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
