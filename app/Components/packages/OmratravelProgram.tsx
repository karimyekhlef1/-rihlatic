import React, { useState, useEffect } from "react";
import Image from "next/image";

interface MediaPath {
  uid: number;
  url: string;
  status: string;
  name: string;
}

interface ScheduleItem {
  id: number;
  day: string;
  media_path: MediaPath;
  schedule_day: string;
}

interface TravelProgramProps {
  schedule: ScheduleItem[];
}

export default function OmraTravelProgram({ schedule }: TravelProgramProps) {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDayClick = (day: number) => {
    if (isMobile) {
      setActiveDay(activeDay === day ? null : day);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div
        className={`flex flex-col sm:flex-row gap-4 sm:gap-2 ${isMobile ? "" : "[&:hover>div]:w-full sm:[&:hover>div]:w-40 [&>div:hover]:w-full sm:[&:div:hover]:w-[30rem]"}`}
      >
        {schedule.map((item, index) => (
          <div
            key={item.id}
            className={`group relative shadow-sm shadow-black/30 h-64 sm:h-96 w-full sm:w-40 ${
              isMobile && activeDay === index ? "w-full" : ""
            } ${!isMobile ? "hover:w-full sm:hover:w-[30rem]" : ""} cursor-pointer rounded-xl overflow-hidden transition-all duration-200`}
            onClick={() => handleDayClick(index)}
          >
            <Image
              className={`h-full w-full object-cover ${isMobile && activeDay === index ? "scale-150" : ""} ${!isMobile ? "group-hover:scale-150" : ""} transition-all`}
              src={item.media_path.url}
              alt={`${item.day} image`}
              width={100}
              height={100}
            />
            <div
              className={`${isMobile && activeDay === index ? "visible" : "invisible"} ${!isMobile ? "group-hover:visible" : ""} absolute inset-0 bg-gradient-to-b from-orange-500/20 to-black`}
            >
              <div className="absolute inset-x-5 bottom-4">
                <div className="flex gap-3 text-white">
                  <p
                    className={`${isMobile ? "font-semibold" : "text-lg font-bold"} text-gray-100`}
                  >
                    {item.day}
                  </p>
                </div>
                <div>
                  <p
                    className={`${isMobile ? "text-sm font-normal" : "text-lg font-normal"} text-gray-100`}
                  >
                    {item.schedule_day}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
