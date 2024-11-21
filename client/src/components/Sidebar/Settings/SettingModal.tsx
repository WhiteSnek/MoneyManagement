import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import SettingsSidebar from "./Sidebar/SettingsSidebar";
import Appearance from "./Sidebar/Tabs/Appearance";
import EditDetails from "./Sidebar/Tabs/EditDetails";
import AddBonus from "./Sidebar/Tabs/AddBonus";

interface SettingModalProps
 {
  togglePopup: () => void;
}

const renderTab = (activeTab: string) => {
  switch (activeTab) {
    case 'appearance':
      return <Appearance />;
    case 'edit-details':
      return <EditDetails />
    case 'add-bonus':
      return <AddBonus />
    default:
      return null;
  }
};

const SettingModal: React.FC<SettingModalProps> = ({ togglePopup }) => {
  const [activeTab, setActiveTab] = useState<string>('appearance');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-3xl w-full relative">
        <div className="flex justify-center items-center">
          <h2 className="text-lg sm:text-2xl font-bold mb-4">Settings</h2>
          <button
            onClick={togglePopup}
            className="text-white flex justify-center items-center p-1 hover:bg-zinc-900 rounded-full absolute top-4 right-4"
          >
            <Close sx={{ fontSize: window.innerWidth > 768 ? 30 : 20 }} />
          </button>
        </div>
        <div className="grid grid-cols-12  my-6">
          <div className="col-span-3 border-r-[1px] border-zinc-400">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="col-span-9 h-96 overflow-scroll">
            {renderTab(activeTab)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
