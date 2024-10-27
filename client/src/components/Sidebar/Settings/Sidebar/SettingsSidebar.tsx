import React from 'react'
import { settings } from '.'
import Button from '../../../utils/Button'

interface SettingsSidebarProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const SettingsSidebar:React.FC<SettingsSidebarProps> = ({activeTab, setActiveTab}) => {
    
  return (
      <div className="flex flex-col text-md gap-2 pr-4 py-2">
        {settings.map((setting, idx) => (
          <Button label={setting.label} onClickFunc={() => setActiveTab(setting.tab)} key={idx} icon={setting.icon} className={activeTab === setting.tab ? 'bg-zinc-900' : ''}/>
        ))}
      </div>
  )
}

export default SettingsSidebar
