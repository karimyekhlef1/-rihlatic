"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/Hooks";
import { getFlightsConditions } from "@/lib/store/api/vols/volsSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FlightConditionsDialogProps {
  flightData: {
    segments: any[][];
    price?: number;
  };
}

interface GroupedConditions {
  [key: string]: string[];
}

const FlightConditionsDialog = ({ flightData }: FlightConditionsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [groupedConditions, setGroupedConditions] = useState<GroupedConditions>(
    {}
  );
  const dispatch = useAppDispatch();

  const { conditions, conditionsLoading, conditionsError } = useAppSelector(
    (state) => ({
      conditions: state.vols.conditions,
      conditionsLoading: state.vols.conditionsLoading,
      conditionsError: state.vols.conditionsError,
    })
  );

  // Get search parameters from the store
  const searchParams = useAppSelector((state: any) => state.vols.searchParams);

  // Memoize passenger quantities to prevent unnecessary re-renders
  const passengerQuantities = useMemo(() => ({
    quantityAdults: searchParams?.quantityAdults || 1,
    quantityChild: searchParams?.quantityChild || 0,
    quantityInfant: searchParams?.quantityInfant || 0,
    quantityInfantWithSeat: searchParams?.quantityInfantWithSeat || 0,
    quantityStudent: searchParams?.quantityStudent || 0,
    quantityYouth: searchParams?.quantityYouth || 0,
    quantitySenior: searchParams?.quantitySenior || 0,
  }), [searchParams]);

  const processConditions = useCallback((data: any) => {
    console.log("Processing conditions data:", data);
    if (!data?.result?.data?.[0]) {
      console.log("No valid data structure found");
      return {};
    }

    const conditionsArray = data.result.data[0];
    console.log("Processing conditions array:", conditionsArray);

    const groupedConditions: GroupedConditions = {};

    // Handle both array and object formats
    const processConditionText = (text: string) => {
      const trimmedText = text.trim();
      if (trimmedText.includes(".")) {
        const [category, ...rest] = trimmedText.split(".");
        const content = rest.join(".").trim();
        if (content) {
          if (!groupedConditions[category]) {
            groupedConditions[category] = [];
          }
          groupedConditions[category].push(content);
        }
      }
    };

    conditionsArray.forEach((conditionGroup: any) => {
      if (Array.isArray(conditionGroup) && conditionGroup[0]) {
        if (Array.isArray(conditionGroup[0])) {
          // Handle nested array format
          const text = conditionGroup[0][0];
          if (typeof text === "string") {
            processConditionText(text);
          }
        } else if (typeof conditionGroup[0] === "string") {
          // Handle flat array format
          processConditionText(conditionGroup[0]);
        }
      }
    });

    console.log("Grouped conditions:", groupedConditions);
    return groupedConditions;
  }, []);

  const fetchConditions = useCallback(async () => {
    if (!flightData?.segments?.[0]?.[0]) {
      console.error("Invalid flight data structure:", flightData);
      return;
    }

    try {
      const firstSegment = flightData.segments[0][0];
      const requestData = {
        ...passengerQuantities,
        segments: flightData.segments.map((segment) =>
          segment.map((leg) => ({
            ...leg,
            fareBasis: leg.fareBasis || firstSegment.fareBasis || "YES",
            boardAirport: leg.boardAirport || firstSegment.boardAirport,
            offAirport: leg.offAirport || firstSegment.offAirport,
          }))
        ),
      };

      console.log(
        "Sending request with data:",
        JSON.stringify(requestData, null, 2)
      );
      await dispatch(getFlightsConditions(requestData)).unwrap();
    } catch (err) {
      console.error("Error in fetchConditions:", err);
    }
  }, [dispatch, flightData, passengerQuantities]);

  // Only fetch conditions when dialog opens
  useEffect(() => {
    let mounted = true;

    if (open && mounted) {
      fetchConditions();
    }

    return () => {
      mounted = false;
    };
  }, [open, fetchConditions]); // Include fetchConditions in dependencies

  // Process conditions when they change
  useEffect(() => {
    if (conditions?.result?.data?.[0]) {
      console.log(
        "Processing conditions from response:",
        JSON.stringify(conditions.result.data[0], null, 2)
      );
      setGroupedConditions(processConditions(conditions));
    } else {
      console.log("No valid conditions data in response:", conditions);
      setGroupedConditions({});
    }
  }, [conditions, processConditions]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group text-sm text-blue-600 flex items-center underline hover:no-underline hover:text-blue-700">
          <Info className="w-4 h-4 mr-1 fill-blue-600 text-white" />
          <span className="font-medium text-xs">Conditions</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Flight Conditions</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {conditionsLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading conditions...</span>
            </div>
          )}

          {conditionsError && (
            <Alert variant="destructive">
              <AlertDescription>{conditionsError}</AlertDescription>
            </Alert>
          )}

          {!conditionsLoading &&
            !conditionsError &&
            Object.entries(groupedConditions).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {!conditionsLoading &&
            !conditionsError &&
            Object.keys(groupedConditions).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No conditions available for this flight.
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightConditionsDialog;
