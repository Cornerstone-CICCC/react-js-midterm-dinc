'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
  image: string;
  onFileSelect: (file: File | null) => void;
}

const ImageUpload = ({ image, onFileSelect }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(image);

  useEffect(() => {
    setPreview(image);
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    } else {
      setPreview(image);
      onFileSelect(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-zinc-200 p-4 rounded-3xl">
      <div className="flex items-center justify-between">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 transition-colors">
          <Image
            src={preview}
            alt="Profile Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Button onClick={() => document.getElementById('imageInput')?.click()}>
          Change photo
          <input
            id="imageInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
