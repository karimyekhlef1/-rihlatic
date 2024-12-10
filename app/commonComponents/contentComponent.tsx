import { Card, CardContent } from "@/components/ui/card";

const ContentComponent: React.FC<ContentProps> = ({
  htmlContent,
  content,
  dynamicContent,
}) => {
  return (
    <div className="px-4 pt-4">
      <Card className="border-none rounded-xl pt-4 w-full max-w-[350px] sm:max-w-[600px] md:max-w-[768px] lg:max-w-[950px]">
        <CardContent>
          {htmlContent ? (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
          ) : null}
          <p>{content}</p>
          {dynamicContent}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentComponent;
