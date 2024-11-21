import React, { useState } from 'react'
import { useItem } from '../../../../../providers/ItemProvider'
import Button from '../../../../utils/Button'
import { Cancel, CheckCircle } from '@mui/icons-material';
import { CircularLoader } from '../../../../utils/Loaders';
import { useList } from '../../../../../providers/ListProvider';
import { useUser } from '../../../../../providers/UserProvider';

interface ConfirmProps {
    productId: string
    toggleConfirm: () => void;
    togglePopup: () => void;
}

const Confirm:React.FC<ConfirmProps> = ({productId, toggleConfirm, togglePopup}) => {
    const {buyItem} = useItem()
    const {getLists} = useList()
    const {getUserProfile} = useUser()
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async() => {
        setLoading(true)
        const response = await buyItem(productId)
        if(response === 'success'){
          setLoading(false)
          await getLists()
          getUserProfile()
          toggleConfirm()
          togglePopup()
        } else{
          setLoading(false)
          alert('Failed to buy item')
          
        }
      }
    const handleCancel = () => {
        toggleConfirm()
        togglePopup()
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-xl w-full">
        {loading ? <CircularLoader size={50} /> :<><h2 className="text-xl sm:text-2xl font-bold mb-2">Did you buy the product?</h2>
        <div className='grid grid-cols-2 gap-4 pt-10'>
            <Button label='Yes' icon={CheckCircle} className='hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950 ' onClickFunc={handleSubmit} />
            <Button label='No' icon={Cancel} className='hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950' onClickFunc={handleCancel} />
        </div></>}
    </div>
    </div>
  )
}

export default Confirm
