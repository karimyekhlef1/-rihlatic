import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import PageTitleComponent from "./pageTitleComponent";
import useHandlingImagesForGallerySlider from "../hooks/useHandlingImagesForGallerySlider";

export default function ImageSlider({ data, page }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { images, setGalleryImages } = useHandlingImagesForGallerySlider(
    page,
    data
  );
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      return undefined;
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      setCurrentIndex(index);
    },
    [emblaApi]
  );
  const getOpacity = (index: number) => {
    const distance = Math.abs(index - currentIndex);
    return Math.max(1 - distance * 0.2, 0.05);
  };

  return (
    <div className="px-4 py-12">
      <PageTitleComponent
        title={
          page === "package"
            ? `${data?.name}`
            : page === "hotel"
              ? `${data?.infos?.name}`
              : ""
        }
        rating={
          page === "package"
            ? null
            : page === "hotel"
              ? parseInt(data?.infos.rating)
              : ""
        }
        adress={
          page === "package"
            ? `${data?.destinations?.[0]?.country?.name},${data?.destinations?.[0]?.name},${data?.destinations?.[0]?.country?.full_name}`
            : page === "hotel"
              ? `${data?.infos?.destination}  ${data?.infos?.city}`
              : ""
        }
      />
      <div className="relative">
        <Image
          src={images[currentIndex]}
          alt={"image1"}
          width={1200}
          height={600}
          className="w-1/1 max-h-[600px] object-cover rounded-lg shadow-md"
        />
        <div className="absolute bottom-[-40px] sm:bottom-[-50px] left-6 sm:left-12  w-10/12 ">
          <Carousel ref={emblaRef} className="w-full ">
            <CarouselContent className="ml-4 w-full ">
              {images.map((image: string, index: number) => (
                <CarouselItem key={index} className="basis-1/8 pl-2">
                  <div className="p-1">
                    <Image
                      src={image}
                      alt={`images${index}`}
                      width={200}
                      height={200}
                      className={` w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] object-cover rounded-md cursor-pointer ${
                        index === currentIndex ? "ring-2 ring-[#ff7300]" : ""
                      }`}
                      style={{ opacity: getOpacity(index) }}
                      onClick={() => scrollTo(index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
