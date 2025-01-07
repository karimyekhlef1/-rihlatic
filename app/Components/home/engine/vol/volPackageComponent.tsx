import React, { useState } from 'react';
import { Package, Settings } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { setVolPackage } from '@/lib/store/engine/vol_search_slice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const VolPackageComponent: React.FC = () => {
    const dispatch = useDispatch<any>();
    const volType = useSelector((state: { volSearchSlice: { volType: string } }) => state.volSearchSlice?.volType);

    const [pdata, setPdata] = useState<any>({
        uniquePackage: false,
        refundable: false,
        directFlight: false,
        openReturn: false,
    });

    const setData = (field: keyof typeof pdata) => {
        setPdata((prev: any) => {
            const newData = { ...prev, [field]: !prev[field] };
            dispatch(setVolPackage(newData));
            return newData;
        });
    }

    const options = [
        { field: "uniquePackage", label: "Unique Package", isShown: true },
        { field: "refundable", label: "Refundable", isShown: true },
        { field: "directFlight", label: "Direct Flight", isShown: true },
        { field: "openReturn", label: "Open Return", isShown: volType === 'Return' },
    ];

    const activeOptionsCount = Object.values(pdata).filter(Boolean).length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        "w-[200px] h-9 justify-start text-xs bg-white border-gray-200",
                        activeOptionsCount > 0 && "border-[#FF8000] bg-orange-50"
                    )}
                >
                    <div className="flex items-center gap-2">
                        {activeOptionsCount > 0 ? (
                            <Settings className="h-3.5 w-3.5 text-[#FF8000]" />
                        ) : (
                            <Package className="h-3.5 w-3.5 text-gray-500" />
                        )}
                        <span className="text-xs">
                            {activeOptionsCount > 0
                                ? `${activeOptionsCount} Option${activeOptionsCount !== 1 ? 's' : ''} Selected`
                                : "Flight Options"}
                        </span>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-3" align="start">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <h4 className="font-medium text-xs">Flight Options</h4>
                    </div>
                    <Separator className="my-2" />
                    <div className="space-y-2">
                        {options.map(({ field, label, isShown }) => (
                            isShown && (
                                <div key={field} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={field}
                                        checked={pdata[field]}
                                        onCheckedChange={() => setData(field)}
                                        className="h-4 w-4 rounded-sm data-[state=checked]:bg-[#FF8000] data-[state=checked]:border-[#FF8000]"
                                    />
                                    <Label 
                                        htmlFor={field} 
                                        className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {label}
                                    </Label>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default VolPackageComponent;
