import React, { useState, useRef } from "react";
import Button from "./Button";
import { ProductDetails } from "../UserLists/Popup/Popup";

interface ImageInputProps {
  label?: string;
  value: string | ArrayBuffer | null | File;
  onChange: (file: File) => void;
  className?: string;
  details: ProductDetails;
  setDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  value,
  onChange,
  details,
  setDetails,
  className = "",
}) => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null | File>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDetails({ ...details, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        onChange(file); // Call the onChange prop with the selected file
        setDetails({ ...details, imageUrl: result as string }); // Use reader.result instead of imagePreview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="text-md text-zinc-300 mb-1">{label}</label>}
      <div className="flex justify-center mt-1 p-4 border-[1px] border-zinc-700 rounded-md items-center flex-col">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <Button
          label="Upload Image"
          type="button"
          className="bg-zinc-900 hover:bg-zinc-950"
          onClickFunc={() => fileInputRef.current?.click()} // Use useRef instead of document.querySelector
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
