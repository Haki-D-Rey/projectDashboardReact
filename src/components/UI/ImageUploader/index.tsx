import React, { FC, useState, useEffect } from 'react';
import FsLightbox from 'fslightbox-react';
import { twMerge } from 'tailwind-merge';

interface IImageUploaderProps {
  label: string;
  value?: File | null;
  onChange?: (file: File) => void;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  imgClx?: string;
}

const URL_IMG = 'https://d32m9psmi7z6jn.cloudfront.net/images/dashboard/no-img.jpg';

const ImageUploader: FC<IImageUploaderProps> = ({ label, value, onChange, inputProps, imgClx }) => {
  const [toggler, setToggler] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(URL_IMG);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (onChange) {
        onChange(file);
      } else {
        const preview = URL.createObjectURL(file);
        setPreview(preview);
      }
    }
  };

  useEffect(() => {
    if (value) {
      const preview = URL.createObjectURL(value);
      setPreview(preview);
    }
  }, [value]);

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <div className="text-blue hover:bg-blue flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg border border-divider bg-base-100">
          <img
            className={twMerge('h-28 w-full object-cover', imgClx)}
            src={preview?.toString()}
            alt="image description"
            onClick={() => setToggler(!toggler)}
          />
        </div>
        <label className="flex w-full items-center justify-center">
          <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
          <div className="p-button p-component w-full">
            <span className="p-button-icon-left pi pi-upload mr-2"></span>
            <span className="p-button-label">{label}</span>
          </div>
        </label>
      </div>
      <FsLightbox key={preview?.toString() || ''} toggler={toggler} sources={[preview?.toString() || '']} />
    </>
  );
};

export default ImageUploader;
