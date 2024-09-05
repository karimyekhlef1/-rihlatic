import { Button } from '@/components/ui/button';

export default function MapComponent() {
  return (
    <div className="w-[350px] h-[250px] relative rounded-lg overflow-hidden shadow-md">
      <div className="w-full h-full bg-gray-200">
        {/* Placeholder for map */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Map Placeholder
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button className="px-14" variant={'active'}>
          Show on map
        </Button>
      </div>
    </div>
  );
}
