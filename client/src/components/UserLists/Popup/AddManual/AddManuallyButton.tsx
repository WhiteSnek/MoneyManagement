import React from 'react'
import Button from '../../../utils/Button';
import { ElectricalServices, Inventory } from '@mui/icons-material';

interface AddManuallyButtonProps {
  manual: boolean
    toggleManual: React.MouseEventHandler<HTMLButtonElement>;
    service: boolean
    toggleService: () => void
}

const AddManuallyButton:React.FC<AddManuallyButtonProps> = ({manual,toggleManual, service, toggleService}) => {
  return (
    <div className='flex gap-2 justify-center items-center p-4 w-full border-t-2 border-zinc-600'>
      <Button label={manual ? 'Add Link' : 'Add Manually'} onClickFunc={toggleManual} className='bg-zinc-900 hover:bg-zinc-950'  />
      <Button
            label={service ? "Add an item" : "Add a service"}
            icon={service ? Inventory : ElectricalServices}
            className="bg-zinc-900 hover:bg-zinc-950"
            onClickFunc={toggleService}
          />
    </div>
  )
}

export default AddManuallyButton
