import React from 'react'
import Button from '../../../utils/Button';

interface AddManuallyButtonProps {
  manual: boolean
    toggleManual: React.MouseEventHandler<HTMLButtonElement>;
}

const AddManuallyButton:React.FC<AddManuallyButtonProps> = ({manual,toggleManual}) => {
  return (
    <div className='flex gap-2 flex-col justify-center items-center p-4 w-full border-t-2 border-zinc-600'>
      <Button label={manual ? 'Add Link' : 'Add Manually'} onClickFunc={toggleManual} className='bg-zinc-900 hover:bg-zinc-950'  />
    </div>
  )
}

export default AddManuallyButton
