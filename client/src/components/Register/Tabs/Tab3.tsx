import React from 'react'
import { RegisterUser } from '../../../types/UserTypes'
import Input from '../../utils/Form/Input'

interface Tab3Props {
  details: RegisterUser
  setDetails: React.Dispatch<React.SetStateAction<RegisterUser>>
}

const Tab3:React.FC<Tab3Props> = ({details, setDetails}) => {
  return (
    <div className='w-full px-8'>
      <h1 className='text-xl font-bold pb-4'>Financial Details</h1>
      <div className='grid grid-cols-1 gap-4'>
      <Input value={details.monthlyIncome} label='Monthly Income:' type='text' inputMode='numeric' onChange={(e)=>setDetails({...details, monthlyIncome: e.target.value})} />
      <Input value={details.creditDate} label='Credit Date:' type='date' onChange={(e)=>setDetails({...details, creditDate: e.target.value})} />
      </div>
      
    </div>
  )
}

export default Tab3
