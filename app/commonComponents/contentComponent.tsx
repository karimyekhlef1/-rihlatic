import { Card, CardContent } from "@/components/ui/card";

interface ContentProps {
  htmlContent?: string;
  content?: string;
  dynamicContent?: React.ReactNode;
}

const ContentComponent: React.FC<ContentProps> = ({
  htmlContent,
  content,
  dynamicContent,
}) => {
  const processContent = (content: string) => {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Find oembed elements and replace them with iframes
    const oembeds = tempDiv.getElementsByTagName("oembed");
    Array.from(oembeds).forEach((oembed) => {
      const url = oembed.getAttribute("url");
      if (url && url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1];
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.width = "100%";
        iframe.height = "400";
        iframe.className = "border rounded-2xl";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        oembed.parentNode?.replaceChild(iframe, oembed);
      }
    });

    return tempDiv.innerHTML;
  };

  return (
    <div className="px-4 pt-4">
      <Card className="border-none rounded-xl pt-4 pb-4 w-full max-w-[350px] sm:max-w-[600px] md:max-w-[768px] lg:max-w-[950px]">
        <CardContent>
          {htmlContent ? (
            <div
              dangerouslySetInnerHTML={{
                __html: processContent(htmlContent),
              }}
            />
          ) : null}
          <p>{content}</p>
          {dynamicContent}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentComponent;
