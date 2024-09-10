'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, Luggage, Plane } from 'lucide-react';

export default function SearchResults() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Set up price alerts</h3>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive alerts when the prices for this route change.
                </p>
                <div className="space-y-4">
                  <h3 className="font-semibold">Bags</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="cabin" />
                      <Label htmlFor="cabin" className="ml-2">
                        Cabin baggage
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="checked" />
                      <Label htmlFor="checked" className="ml-2">
                        Checked baggage
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center justify-between">
                    Stops
                    <ChevronDown size={20} />
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="any" defaultChecked />
                      <Label htmlFor="any" className="ml-2">
                        Any
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="direct" />
                      <Label htmlFor="direct" className="ml-2">
                        Direct
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="1stop" />
                      <Label htmlFor="1stop" className="ml-2">
                        Up to 1 stop
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="2stops" />
                      <Label htmlFor="2stops" className="ml-2">
                        Up to 2 stops
                      </Label>
                    </div>
                  </div>
                </div>
                {/* Add more filter sections here */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full lg:w-3/4">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Best</h2>
                  <p className="text-xl font-semibold text-blue-600">
                    $558 . 26h 00m
                  </p>
                </div>
                <div className="text-right">
                  <p>Cheapest</p>
                  <p className="text-muted-foreground">$541 . 37h 06m</p>
                </div>
                <div className="text-right">
                  <p>Fastest</p>
                  <p className="text-muted-foreground">$1,341 . 17h 20m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {[1, 2, 3].map((index) => (
            <Card key={index} className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">
                    Thu 26 Sep . Outbound
                  </div>
                  <div className="text-2xl font-bold">$584</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">ALG</h3>
                    <p className="text-lg">12:25</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold">2 stops</p>
                    <div className="flex items-center">
                      <Plane size={20} className="text-blue-500 mr-2" />
                      <Plane size={20} className="text-red-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">9h 20m</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-semibold">MME</h3>
                    <p className="text-lg">21:55</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    21 nights in England
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <Luggage size={20} className="mr-2" />
                    <span className="text-sm">0</span>
                  </div>
                  <div className="flex items-center">
                    <Plane size={20} className="mr-2" />
                    <span className="text-sm font-semibold">
                      Self-transfer hack
                    </span>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
