import React, { useState } from 'react'
import NumberInput from '../../../../utils/Form/NumberInput'
import Button from '../../../../utils/Button'
import { Add } from '@mui/icons-material'
import { useUser } from '../../../../../providers/UserProvider'

const AddBonus:React.FC = () => {
    const [bonus, setBonus] = useState<number>(0)
    const {addBonus} = useUser()
    const handleSubmit = async() => {
      if(bonus === 0){
        alert('Enter bonus')
        return;
      }
      await addBonus(bonus);
    }
  return (
    <div className="px-4">
      <h1 className="text-lg font-semibold text-zinc-200 border-b-[1px] border-zinc-600 py-2">Add Bonus</h1>
      <div>
      <NumberInput value={bonus} onChange={setBonus} step={100} label='Enter bonus amount: ' />
      <Button label='Add Bonus' icon={Add} className='bg-zinc-900 float-end hover:bg-zinc-950 hover:-translate-y-1' onClickFunc={handleSubmit} />
      </div>
    </div>
  )
}

export default AddBonus
