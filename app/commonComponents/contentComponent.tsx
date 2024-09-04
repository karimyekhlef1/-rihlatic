import { Card, CardContent } from '@/components/ui/card';

const ContentComponent: React.FC<ContentProps> = ({
  content,
  dynamicContent,
}) => {
  return (
    <div className="px-8 pt-4">
      <Card className="border-none pt-4 w-[900px]">
        <CardContent>
          <p>{content}</p>
          {dynamicContent}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentComponent;
