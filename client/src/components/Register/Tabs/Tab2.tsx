import React from 'react'
import { RegisterUser } from '../../../types/UserTypes'
import Input from '../../utils/Form/Input'
import Select from '../../utils/Form/Select'
import AvatarInput from '../../utils/Form/AvatarInput'

interface Tab2Props {
  details: RegisterUser
  setDetails: React.Dispatch<React.SetStateAction<RegisterUser>>
}

const Tab2:React.FC<Tab2Props> = ({details, setDetails}) => {
  return (
    <div className='w-full px-8'>
      <h1 className='text-xl font-bold pb-4'>Personal Details</h1>
      <div className='grid grid-cols-1 gap-4'>
      <Input value={details.fullname} label='Full name:' type='text' onChange={(e)=>setDetails({...details, fullname: e.target.value})} />
      <Input value={details.dob} label='Date of Birth:' type='date' onChange={(e)=>setDetails({...details, dob: e.target.value})} />
      <Select value={details.gender} options={[{label: "Male", value: "male"},{label: "Female", value: "female"},{label: "Other", value: "other"},]} className='w-full bg-zinc-900' title='Gender:' onChange={(e)=>setDetails({...details, gender:e.target.value})} />
      <AvatarInput value={details.avatar} label='Display Image:' onChange={(file) => setDetails({...details, avatar: file})} details={details} setDetails={setDetails} />
      </div>
    </div>
  )
}

export default Tab2
