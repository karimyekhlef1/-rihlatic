import { Snowflake, Wifi, Utensils, Plus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FacilitiesOptions from '@/app/commonComponents/facilitiesOptions';

export default function PopularFacilities() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Row of badges */}
      <div className="flex flex-row flex-wrap gap-2 items-start">
        <FacilitiesOptions
          name="Climatisation"
          logo={
            <Snowflake
              size={15}
              className="font-semibold text-xs text-[#27d765]"
              fill="#eafbf0"
            />
          }
        />{' '}
        <FacilitiesOptions
          name="Wifi"
          logo={
            <Wifi
              size={15}
              className="font-semibold text-xs text-[#27d765]"
              fill="#eafbf0"
            />
          }
        />{' '}
        <FacilitiesOptions
          name="Restaurant"
          logo={
            <Utensils
              size={15}
              className="font-semibold text-xs text-[#27d765]"
              fill="#eafbf0"
            />
          }
        />{' '}
        <FacilitiesOptions
          name="Add more"
          logo={
            <Plus
              size={15}
              className="font-semibold text-xs text-[#27d765]"
              fill="#eafbf0"
            />
          }
        />
        {/* Add more badges as needed */}
      </div>

      {/* Separator */}
      <Separator className="w-full" />

      {/* List of titles and sublists */}
      <div className="space-y-2">
        <div>
          <h2 className="text-black font-semibold">Title 1</h2>
          <ul className="list-disc list-inside text-sm text-gray-500 pl-4">
            <li>Sublist item 1</li>
            <li>Sublist item 2</li>
            {/* Add more sublist items as needed */}
          </ul>
        </div>
        <div>
          <h2 className="text-black font-semibold">Title 2</h2>
          <ul className="list-disc list-inside text-sm text-gray-500 pl-4">
            <li>Sublist item 1</li>
            <li>Sublist item 2</li>
            {/* Add more sublist items as needed */}
          </ul>
        </div>
        {/* Add more titles and sublists as needed */}
      </div>
    </div>
  );
}
