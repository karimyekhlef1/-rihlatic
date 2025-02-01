import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ResultCardSkeleton() {
  return (
    <div className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-0 sm:pb-3">
      <div className="flex flex-col md:flex-row w-full transition-all duration-300 ease-in-out hover:shadow-md rounded-xl">
        <Card className="flex-grow rounded-xl md:rounded-r-none border-b-0 md:border-b md:border-r-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Flight info section */}
              <div>
                {/* Date */}
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                
                {/* Flight details */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* Departure */}
                  <div className="space-y-2">
                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Arrival */}
                  <div className="space-y-2">
                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-4 py-3 border-t border-dashed border-gray-200">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[26px] w-24 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-[200px] lg:w-[240px] rounded-xl md:rounded-l-none flex flex-col border-t-0 md:border-t md:border-l-0">
          <CardContent className="p-4 flex-grow flex flex-col justify-between gap-3">
            <div className="flex-grow flex items-center justify-center">
              <div className="w-28 h-7 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-full h-9 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
