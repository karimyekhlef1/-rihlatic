import { ServiceProps } from '@/app/Types/home/service';
import React from 'react';


import image1 from '@/public/images/home/one.png';
import image2 from '@/public/images/home/two.png';
import image3 from '@/public/images/home/three.png';
import HomeServiceComponent from './service';


const ServiceSection: React.FC = () => {

    const primaryFeatures: ServiceProps[] = [
        {
            image: image1.src,
            name: 'Server monitoring',
            description: 'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
        },
        {
            image: image2.src,
            name: 'Collaborate',
            description: 'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
        },
        {
            image: image3.src,
            name: 'Task scheduling',
            description: 'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
        },
    ];
    return (
        <div className="container">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {primaryFeatures.map((feature: ServiceProps, index: number) => (
                <HomeServiceComponent key={index} {...feature} />
            ))}
            </dl>
        </div>
    );
};

export default ServiceSection;