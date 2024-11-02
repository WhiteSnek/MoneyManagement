import React from "react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs: Array<string> = ["Basic", "Personal", "Financial"];

  return (
    <div className="p-4 w-full grid grid-cols-3">
      {tabs.map((tab,idx)=>(
        <button key={idx} className={`bg-zinc-900 px-4 py-2 ${tab.toLowerCase()===activeTab ? 'border-b-2 border-zinc-300' : ''} transition-all hover:bg-zinc-950`} onClick={()=>setActiveTab(tab.toLowerCase())}>{tab}</button>
      ))}
    </div>
  );
};

export default TabNavigation;
