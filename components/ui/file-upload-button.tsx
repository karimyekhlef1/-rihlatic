import React, { useRef } from 'react';
import { Button } from './button';

interface FileUploadButtonProps {
  onFileSelect: (file: File) => void;
  label?: string;
}

export function FileUploadButton({
  onFileSelect,
  label = 'Upload File',
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <Button variant={'secondary'} onClick={handleClick}>
        {label}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
}
