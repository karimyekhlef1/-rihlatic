import { useSelector, useDispatch } from 'react-redux';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RootState } from '@/lib/store/store';

import { toggleSection } from '@/lib/store/searchSlices/sidebarSectionsSlice';

interface SidebarSectionProps {
  title: string;
  children?: React.ReactNode;
}

const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) =>
      state.sidebarSections[title.toLowerCase().replace(' ', '')]
  );

  const sectionKey = title.toLowerCase().replace(' ', '');

  const handleValueChange = (value: string) => {
    dispatch(toggleSection(sectionKey));
  };

  return (
    <Accordion
      type="single"
      value={isOpen ? sectionKey : ''}
      onValueChange={handleValueChange}
      collapsible
    >
      <AccordionItem value={sectionKey}>
        <AccordionTrigger className="py-2 text-sm font-medium">
          {title}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidebarSection;
