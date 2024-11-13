import React, { useState } from "react";
import IconPopup from "./IconPopup";
import Button from "../Button";
import { ProductDetails } from "../../UserLists/Popup/Popup";
import { icons } from "../../../constants/services";

interface IconInputProps {
  label?: string;
  value: string | ArrayBuffer | null | File;
  onChange: (icon: string) => void;
  className?: string;
  details: ProductDetails;
  setDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
}

const IconInput: React.FC<IconInputProps> = ({
  label,
  value,
  onChange,
  className = "",
  details,
  setDetails
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | ArrayBuffer | null | File>(value);


  const handleIconSelect = (icon: string) => {
    setIconPreview(icon);
    onChange(icon);

    // Update `details` with the selected icon URL
    setDetails({ ...details, image: icon, imageUrl: icon });
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="text-md text-zinc-300 mb-1">{label}</label>}
      <div className="flex justify-center mt-1 p-4 border-[1px] border-zinc-700 focus:border-zinc-500 hover:border-zinc-500 rounded-md items-center flex-col">
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
              className="mt-2 rounded-md h-20 w-20 object-cover"
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
