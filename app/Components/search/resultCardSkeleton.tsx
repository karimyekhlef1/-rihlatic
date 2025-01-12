import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ResultCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm sm:max-w-4xl mx-auto sm:px-0 sm:pb-4">
      <div className="flex flex-col sm:flex-row w-full">
        <Card className="flex-grow rounded-t-xl sm:rounded-t-xl sm:border-r-0 sm:mb-0 border-b-0 sm:border-b">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Outbound Flight */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" /> {/* Date and type */}
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-16" /> {/* Airport code */}
                    <Skeleton className="h-4 w-12" /> {/* Time */}
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <Skeleton className="h-6 w-20" /> {/* Duration */}
                    <Skeleton className="h-4 w-16 mt-1" /> {/* Stops */}
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-16" /> {/* Airport code */}
                    <Skeleton className="h-4 w-12" /> {/* Time */}
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="relative">
                <Skeleton className="h-px w-full" />
              </div>

              {/* Return Flight */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16 mt-1" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 border-t border-dashed border-gray-300">
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardFooter>
        </Card>

        <div className="hidden sm:block w-px border-r border-dashed border-gray-300 my-4"></div>

        <Card className="w-full sm:w-60 rounded-b-xl sm:rounded-t-xl sm:border-l-0 flex flex-col border-t-0 sm:border-t">
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex-grow flex items-center justify-center">
              <Skeleton className="h-8 w-32" /> {/* Price */}
            </div>
            <Skeleton className="h-10 w-full mt-4" /> {/* Button */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultCardSkeleton;
