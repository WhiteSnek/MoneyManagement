import React, { useState } from 'react'
import { RegisterUser } from '../../../types/UserTypes'
import Input from '../../utils/Form/Input'

interface Tab1Props {
  details: RegisterUser
  setDetails: React.Dispatch<React.SetStateAction<RegisterUser>>
}

const Tab1:React.FC<Tab1Props> = ({details, setDetails}) => {
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  return (
    <div className='w-full px-8'>
      <h1 className='text-xl font-bold pb-4'>Basic Details</h1>
      <div className='grid grid-cols-1 gap-4'>
      <Input value={details.username} label='Username:' type='text' onChange={(e)=>setDetails({...details, username: e.target.value})} />
      <Input value={details.email} label='Email:' type='email' onChange={(e)=>setDetails({...details, email: e.target.value})} />
      <Input value={details.password} label='Password:' type='password' onChange={(e)=>setDetails({...details, password: e.target.value})} />
      <Input value={confirmPassword} label='Confirm Password:' type='password' onChange={(e)=>setConfirmPassword(e.target.value)} />
      </div>
    </div>
  )
}

export default Tab1
