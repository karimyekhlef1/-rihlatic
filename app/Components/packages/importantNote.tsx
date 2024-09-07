const ImportantNote: React.FC<ImportantNoteProps> = ({ content }) => {
  return (
    <div className="bg-[#fffbf8] border-l-2 rounded-lg border-orange-500 p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Important Notes:</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ImportantNote;
