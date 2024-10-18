import React, { useState } from "react";
import Button from "./Button";

interface ImageInputProps {
  label?: string;
  value: string | ArrayBuffer | null | File;
  onChange: (file: File) => void; 
  className?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  value,
  onChange,
  className = "",
}) => {
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null | File
  >(value);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange(file); // Call the onChange prop with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="text-md text-zinc-300 mb-1">{label}</label>}
      <div className="flex justify-center p-4 border-[1px] border-zinc-700 rounded-md items-center flex-col">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden" // Hide the traditional input
        />
        <Button
          label="Upload Image"
          type="button"
          className="bg-zinc-900 hover:bg-zinc-950"
          onClickFunc={() =>
            (
              document.querySelector('input[type="file"]') as HTMLInputElement
            )?.click()
          }
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview as string}
              alt="Preview"
              className="mt-2 rounded-md h-40 aspect-square object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
