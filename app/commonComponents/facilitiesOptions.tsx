import { Badge } from '@/components/ui/badge';

const FacilitiesOptions: React.FC<FacilityBadgeProps> = ({ name, logo }) => {
  return (
    <div className="flex flex-row">
      <Badge variant={'rihlatic'}>
        <div className="pr-1">{logo}</div>
        {name}
      </Badge>
    </div>
  );
};

export default FacilitiesOptions;
