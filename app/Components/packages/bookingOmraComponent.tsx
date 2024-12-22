import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

import Link from "next/link";
import DepartureDialog from "@/app/Components/packages/departure-dialog";

export default function BookingPackageComponent(data: any) {
  const departure_date = new Date(data?.data?.[0]?.departure_date);
  const return_date = new Date(data?.data?.[0]?.return_date);
  const formattedDeparture_date = format(departure_date, "dd-MMMM-yyyy", {
    locale: fr,
  });
  const formattedReturn_date = format(return_date, "dd-MMMM-yyyy", {
    locale: fr,
  });

  const [isDepartureDialogOpen, setIsDepartureDialogOpen] = useState(false);
  const [isDepartureSelected, setIsDepartureSelected] = useState(false);

  return (
    <div>
      <Card className="w-[300px] rounded-xl">
        <CardContent className="px-0 py-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="text-xs">Starting from</p>
              <p className="font-semibold text-lg">
                {data?.data?.[0]?.price_ini} DZD
              </p>
            </div>
            <Separator />
            <div className="flex flex-col pt-4 pb-8">
              <div className="flex flex-row items-center">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#43acff]"
                  fill="#b4deff"
                />
                <p className="text-xs text-gray-700 font-medium pl-2">
                  {data?.data?.[0]?.total_days} nights{" "}
                  <span className="text-xs text-gray-700 font-bold">/</span>{" "}
                  {data?.data?.[0]?.total_days + 1} days
                </p>
              </div>
              <div className="flex flex-row items-center mt-2">
                <CircleCheck
                  size={15}
                  className="font-semibold text-xs text-[#ff8000]"
                  fill="#ffcc99"
                />
                <p className="flex flex-row items-center text-xs text-gray-700 font-medium pl-2">
                  {formattedDeparture_date}
                  <ArrowRight size={15} strokeWidth={3} />
                  {formattedReturn_date}
                </p>
              </div>
            </div>
            <div className="pb-4">
              <Button
                className="px-14"
                variant={"rihlatic"}
                onClick={() => setIsDepartureDialogOpen(true)}
              >
                {isDepartureSelected ? "Modify departure" : "Select departure"}
              </Button>
              <DepartureDialog
                open={isDepartureDialogOpen}
                onOpenChange={setIsDepartureDialogOpen}
                onSelect={() => setIsDepartureSelected(true)}
                onDelete={() => setIsDepartureSelected(false)}
              />
            </div>
            <Separator className="w-[90%]" />
            <div className="pt-4">
              <Link href={"/omras/payment"}>
                <Button className="px-20" variant={"rihlatic"}>
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
