import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function FilterComponent() {
  return (
    <div className="p-4">
      <Accordion type="multiple" className="w-[250px]">
        <AccordionItem value="pays">
          <AccordionTrigger>Pays</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              <CheckboxItem id="all" label="All" />
              <CheckboxItem id="egypt" label="Egypt" />
              <CheckboxItem id="turkey" label="Turkey" />
              <CheckboxItem id="dubai" label="Dubai" />
              <CheckboxItem id="poland" label="Poland" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" className="w-[250px]">
        <AccordionItem value="categorie">
          <AccordionTrigger>Catégorie</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              <CheckboxItem id="family-trip" label="Family Trip" />
              <CheckboxItem id="group-travel" label="Group travel" />
              <CheckboxItem id="adventure" label="Adventure" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function CheckboxItem({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
