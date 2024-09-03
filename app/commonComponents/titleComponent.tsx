const TitleComponent: React.FC<IconButtonProps> = ({ title, icon, label }) => {
  return (
    <div className="flex flex-row pl-10">
      {icon}
      <h1 className="font-semibold pl-1 align-middle leading-[18px]">
        {title}
      </h1>
    </div>
  );
};

export default TitleComponent;
