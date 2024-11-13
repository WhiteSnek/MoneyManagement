// IconPopup.tsx
import { Close } from "@mui/icons-material";
import React from "react";

interface Icons {
    icon: string
    title:string
}

interface IconPopupProps {
  isVisible: boolean;
  icons: Icons[];
  onSelect: (icon: string) => void;
  onClose: () => void;
}

const IconPopup: React.FC<IconPopupProps> = ({ isVisible, icons, onSelect, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-xl w-full">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Select an Icon</h2>
          <button
            onClick={onClose}
            className="text-white flex justify-center items-center p-2 hover:bg-zinc-700 rounded-full transition duration-200"
          >
            <Close sx={{ fontSize: window.innerWidth > 768 ? 30 : 20 }} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 justify-center items-center">
          {icons.map((icon, index) => (
            <img
              key={index}
              src={icon.icon}
              alt={icon.title}
              title={icon.title}
              className="w-20 aspect-square cursor-pointer object-cover rounded-lg"
              onClick={() => {
                onSelect(icon.icon);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconPopup;
