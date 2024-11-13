import React, { useState, useRef } from "react";
import Button from "../Button";

interface AvatarInputProps {
  label?: string;
  avatarUrl: string | null;
  setAvatar: (file: File, url: string) => void;
  className?: string;
}

const AvatarInput: React.FC<AvatarInputProps> = ({
  label,
  avatarUrl,
  setAvatar,
  className = "",
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setAvatar(file, result); // Update avatar file and URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="text-md text-zinc-300 mb-1">{label}</label>}
      <div className="flex justify-center mt-1 p-4 border-[1px] border-zinc-700 hover:border-zinc-500 rounded-md items-center flex-col">
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
          onClickFunc={() => fileInputRef.current?.click()} 
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-full h-40 aspect-square object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarInput;
