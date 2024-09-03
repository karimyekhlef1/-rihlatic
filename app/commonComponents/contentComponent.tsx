import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ContentComponent: React.FC<ContentProps> = ({
  content,
  dynamicContent,
}) => {
  return (
    <div className="px-10 pt-4">
      <Card className="border-none pt-4">
        <CardContent>
          <p>{content}</p>
          {dynamicContent}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentComponent;
