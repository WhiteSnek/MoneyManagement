import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import AddUrl from "./AddUrl/AddUrl";
import AddManuallyButton from "./AddManual/AddManuallyButton";
import AddManualForm from "./AddManual/AddManualForm";

interface PopupProps {
  togglePopup: React.MouseEventHandler<HTMLButtonElement>;
  month: string;
}

const Popup: React.FC<PopupProps> = ({ togglePopup, month }) => {
  const [manual, setManual] = useState<boolean>(false);
  const toggleManual = () => {
    setManual(!manual);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-8 shadow-3xl max-w-3xl w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Add an Item for {month}</h2>
          <button
            onClick={togglePopup}
            className="text-white flex justify-center items-center p-1 hover:bg-zinc-900 rounded-full"
          >
            <Close sx={{ fontSize: 30 }} />
          </button>
        </div>
        {!manual ? <AddUrl /> : <AddManualForm />}
        <AddManuallyButton toggleManual={toggleManual} manual={manual} />
      </div>
    </div>
  );
};

export default Popup;
