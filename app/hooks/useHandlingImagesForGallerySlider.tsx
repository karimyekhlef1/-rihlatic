import { useState, useMemo } from 'react';

export default function useHandlingImagesForGallerySlider(
  type: "packages" | "Hotels", 
  data: any
) {
  // Use useMemo to memoize the image processing
  const images = useMemo(() => {
    switch (type) {
      case "packages":
        return [
          data?.url_featured_image || "", 
          ...(data?.gallery?.map((img: any) => img.url) || [])
        ];
      case "Hotels":
        return []; // Or implement hotel-specific image logic
      default:
        return [];
    }
  }, [type, data]);

  // Optional: If you want to manage state
  const [galleryImages, setGalleryImages] = useState<string[]>(images);

  return { images, setGalleryImages };
}

