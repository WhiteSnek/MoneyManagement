import React, { useState } from "react";
import Button from "../utils/Button";
import { Google, Microsoft } from "@mui/icons-material";
import Tab1 from "./Tabs/Tab1";
import TabNavigation from "./TabNavigation/TabNavigation";
import Tab2 from "./Tabs/Tab2";
import Tab3 from "./Tabs/Tab3";
import { RegisterUser } from "../../types/UserTypes";

const renderTabs = (activeTab: string, details:RegisterUser, setDetails: React.Dispatch<React.SetStateAction<RegisterUser>>) => {
    switch (activeTab) {
        case 'basic':
            return <Tab1 details={details} setDetails={setDetails}/>
        case 'personal':
            return <Tab2 details={details} setDetails={setDetails} />
        case 'financial':
            return <Tab3 details={details} setDetails={setDetails} />
    }
}



const RegisterBlock: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('basic')
    const [details,setDetails] = useState<RegisterUser>({
      fullname: '',
      username: '',
      email: '',
      avatar: null,
      avatarUrl: '',
      password: '',
      dob: '',
      gender: 'male',
      monthlyIncome: '0',
      creditDate: '',
    })
  return (
    <div className="flex justify-center items-center bg-zinc-900">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-4xl w-full relative  ">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <div className="flex items-center">
        <div className="grid grid-cols-1 justify-center p-4 gap-2 w-2/3  ">
          <Button
            label="Register with Google"
            icon={Google}
            className="hover:-translate-y-1 border-2 border-zinc-500 hover:border-zinc-700"
          />
          <Button
            label="Register with Microsoft"
            icon={Microsoft}
            className="hover:-translate-y-1 border-2 border-zinc-500 hover:border-zinc-700"
          />
        </div>
        
        <div className="w-full border-l-[1px] border-zinc-500 h-[65vh]">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabs(activeTab, details, setDetails)}
        <Button label={activeTab === 'financial' ? 'Register': 'Next'} className='hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950 my-4 mx-auto w-1/2 ' />
        </div>
      </div>
      </div>
    </div>
  );
};

export default RegisterBlock;
