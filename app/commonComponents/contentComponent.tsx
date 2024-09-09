import { Card, CardContent } from '@/components/ui/card';

const ContentComponent: React.FC<ContentProps> = ({
  content,
  dynamicContent,
}) => {
  return (
    <div className="px-8 pt-4">
      <Card className="border-none rounded-xl pt-4 w-full max-w-[350px] sm:max-w-[600px] md:max-w-[768px] lg:max-w-[900px]">
        <CardContent>
          <p>{content}</p>
          {dynamicContent}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentComponent;
