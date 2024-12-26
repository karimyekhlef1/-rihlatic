import { useState, useMemo } from 'react';

export default function useHandlingImagesForGallerySlider(
  type: "package" | "hotel", 
  data: any
) {
  // Use useMemo to memoize the image processing
  const images = useMemo(() => {
    switch (type) {
      case "package":
        return [
          data?.url_featured_image || "", 
          ...(data?.gallery?.map((img: any) => img.url) || [])
        ];
      case "hotel":
        return data?.images && Array.isArray(data.images)
        ? [data.feature_image, ...data.images]
        : data?.feature_image
        ? [data.feature_image]
        : [];
      default:
        return [];
    }
  }, [type, data]);

  // Optional: If you want to manage state
  const [galleryImages, setGalleryImages] = useState<string[]>(images);

  return { images, setGalleryImages };
}

