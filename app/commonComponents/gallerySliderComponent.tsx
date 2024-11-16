import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import { GalleryProps } from '../Types/Common/gallery';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import image1 from '@/public/images/packages/image_1.jpg';
import image2 from '@/public/images/packages/image_2.jpg';
import image3 from '@/public/images/packages/image_3.jpg';
import PageTitleComponent from './pageTitleComponent';

// Sample image data (replace with your own images)
const images: GalleryProps[] = [
  {
    title: 'Istanbul Group Trip , Turkey',
    image: image1.src,
    name: 'Turkey',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
    rating: 4.5,
  },
  {
    title: 'Explore the city',
    image: image2.src,
    name: 'Istanbul city',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
    rating: 3,
  },
  {
    title: 'Hotel in the woods',
    image: image3.src,
    name: 'Visit Turkey with friends',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
    rating: 5,
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      return undefined;
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      setCurrentIndex(index); // Immediately update the current index
    },
    [emblaApi]
  );

  return (
    <div className="px-4 py-12">
      <PageTitleComponent
        title={images[currentIndex].title}
        rating={images[currentIndex].rating}
        adress={images[currentIndex].name}
      />
      <div className="relative">
        <Image
          src={images[currentIndex].image}
          alt={images[currentIndex].name}
          width={1200}
          height={600}
          className="w-1/1 max-h-[600px] object-cover rounded-lg shadow-md"
        />
        <div className="absolute bottom-[-40px] sm:bottom-[-50px] left-6 sm:left-12">
          <Carousel ref={emblaRef} className="w-full max-w-md">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/3 pl-2">
                  <div className="p-1">
                    <Image
                      src={image.image}
                      alt={image.name}
                      width={200}
                      height={200}
                      className={`w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] object-cover rounded-md cursor-pointer ${
                        index === currentIndex ? 'ring-2 ring-[#ff7300]' : ''
                      }`}
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
