import React, { useState } from 'react';
import Input from '../../../../utils/Form/Input';
import AvatarInput from '../../../../utils/Form/AvatarInput';
import Button from '../../../../utils/Button';

export interface UserDetails {
  name: string;
  avatar: string | ArrayBuffer | null | File;
  avatarUrl: string;
  email: string;
  phone: string;
}

const EditDetails: React.FC = () => {
  const [details, setDetails] = useState<UserDetails>(
    {
      name: '',
      avatar: '',
      avatarUrl: '',
      email: '',
      phone: '',
    }
  )

  const [creditDate,setCreditDate] = useState<string>('')
  
  const handleSubmit = () => {
    const {name,email,phone} = details
    if(name === '' || email === '' || phone === ''){
      console.log('All fields are required')
    }
    console.log(details)
  }

  return (
    <div className="px-4">
      <h1 className="text-lg font-semibold text-zinc-200 border-b-[1px] border-zinc-600 py-2">Edit Details</h1>
      <div className="p-2">
        <h3 className="text-zinc-500">Basic Details</h3>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Name:</p>
          <div className="col-span-2">
            <Input value={details.name} type='text' onChange={(e)=>setDetails({...details, name: e.target.value})} className='w-full'/>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Email:</p>
          <div className="col-span-2">
            <Input value={details.email} type='email' onChange={(e)=>setDetails({...details, email: e.target.value})} className='w-full'/>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Phone number:</p>
          <div className="col-span-2">
            <Input value={details.phone} type='text' onChange={(e)=>setDetails({...details, phone: e.target.value})} className='w-full'/>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Avatar:</p>
          <div className="col-span-2">
            <AvatarInput value={details.avatar} onChange={(file) => setDetails({...details, avatar: file})} details={details} setDetails={setDetails} />
          </div>
        </div> 
        <h3 className="text-zinc-500">Preferences</h3>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Set Credit Date:</p>
          <div className="col-span-2">
            <Input value={creditDate} type='date' onChange={(e)=>setCreditDate(e.target.value)} className='w-full'/>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <Button label='Submit Changes' onClickFunc={handleSubmit} className='hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950'/>
      </div>
    </div>
  );
};

export default EditDetails;
