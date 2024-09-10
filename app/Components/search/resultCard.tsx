import { Luggage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function ResultCard() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex">
        <Card className="flex-grow rounded-xl border-r-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Thu 26 Sep • Outbound
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">ALG</div>
                    <div className="text-xl">12:25</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-full px-4 py-1 text-sm text-black font-medium flex justify-center">
                      2 stops
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      9h 20m
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">MME</div>
                    <div className="text-xl">21:55</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="border-t border-dashed border-gray-300 my-4"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-4 py-1 text-sm text-black font-medium flex justify-center border border-gray-200">
                  21 nights in England
                </div>
              </div>

              <div className="pt-4 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Thu 26 Sep • Outbound
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">ALG</div>
                    <div className="text-xl">12:25</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mt-1">
                      9h 20m
                    </div>
                    <div className="bg-gray-100 rounded-full px-4 py-1 text-sm text-black font-medium">
                      2 stops
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">MME</div>
                    <div className="text-xl">21:55</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t border-dashed border-gray-300">
            <div className="flex items-center space-x-2">
              <Luggage className="h-5 w-5" />
              <span className="text-sm">1</span>
            </div>
          </CardFooter>
        </Card>

        <div className="w-px border-r border-dashed border-gray-300 my-4"></div>

        <Card className="w-60 rounded-xl border-l-0">
          <CardContent className="p-4 flex-grow flex items-center justify-center">
            <div className="flex flex-col h-full justify-between">
              <div className="flex-grow flex items-center justify-center">
                <span className="text-3xl font-bold">$584</span>
              </div>
              <Button className="w-full mt-4" variant={'active'}>
                Select
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
