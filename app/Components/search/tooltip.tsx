import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useState, useEffect } from 'react';

import { FaInfoCircle } from 'react-icons/fa';

export default function TooltipComponent({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };
  return (
    <TooltipProvider>
      <Tooltip open={isMobile ? isOpen : undefined}>
        <TooltipTrigger asChild>
          <span
            onClick={handleInteraction}
            className={isMobile ? 'touch-manipulation' : ''}
          >
            {isMobile ? <FaInfoCircle size={14} /> : <FaInfoCircle size={14} />}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
