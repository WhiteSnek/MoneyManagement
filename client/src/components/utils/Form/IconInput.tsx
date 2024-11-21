import React, { useState } from "react";
import IconPopup from "./IconPopup";
import Button from "../Button";
import { icons } from "../../../constants/services";

interface IconInputProps {
  label?: string;
  value: string | null;
  onChange: (icon: string) => void;
  className?: string;
}

const IconInput: React.FC<IconInputProps> = ({
  label,
  value,
  onChange,
  className = "",
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(value);

  const handleIconSelect = (icon: string) => {
    setIconPreview(icon);
    onChange(icon);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="text-md text-zinc-300 mb-1">{label}</label>}
      <div className="flex justify-center mt-1 p-4 border-[1px] border-zinc-700 hover:border-zinc-500 rounded-md items-center flex-col">
        <Button
          label="Select Icon"
          type="button"
          className="bg-zinc-900 hover:bg-zinc-950"
          onClickFunc={() => setIsPopupVisible(true)}
        />
        {iconPreview && (
          <div className="mt-2">
            <img
              src={iconPreview as string}
              alt="Selected Icon"
              className="rounded-md h-20 w-20 object-cover"
            />
          </div>
        )}
      </div>
      <IconPopup
        isVisible={isPopupVisible}
        icons={icons}
        onSelect={handleIconSelect}
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default IconInput;
