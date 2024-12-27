import { Button } from '@/components/ui/button';

interface Coordinates {
  longitude: string;
  latitude: string;
}

interface MapComponentProps {
  data?:any
}

export default function MapComponent({ data }: MapComponentProps) {
  const coordinates = data?.localisation;
  const hasCoordinates = Boolean(coordinates?.latitude && coordinates?.longitude);

  const mapUrl = hasCoordinates 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.longitude},${coordinates.latitude},${coordinates.longitude},${coordinates.latitude}&layer=mapnik&marker=${coordinates.latitude},${coordinates.longitude}`
    : '';
    const handleShowMap = () => {
      if (hasCoordinates) {
        const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
        window.open(googleMapsUrl, '_blank');
      }
    };

  return (
    <div className="w-[300px] h-[250px] relative rounded-3xl overflow-hidden shadow-md">
      <div className="w-full h-full bg-gray-200">
        {hasCoordinates ? (
          <iframe
            className="w-full h-full rounded-lg"
            src={mapUrl}
            title="Map View"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Map Placeholder
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button 
          className="px-14" 
          variant="active"
          disabled={!hasCoordinates}
          onClick={handleShowMap}
        >
          Show on map
        </Button>
      </div>
    </div>
  );
}