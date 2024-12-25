import { Snowflake, Wifi, Utensils, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FacilitiesOptions from '@/app/commonComponents/facilitiesOptions';

type PopularFacilitiesProps = {
  data: string[] | undefined;
};

export default function PopularFacilities({ data }: PopularFacilitiesProps) {
  if (!data || data.length === 0) {
    return <p>No facilities available.</p>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row flex-wrap gap-2 items-start">
        {data.map((item: string, index: number) => (
          <FacilitiesOptions
            key={`facility-${index}`}
            name={item}
            logo={null}
          />
        ))}
      </div>
      
    </div>
  );
}