import React from 'react'
import {links} from './index'
import NavButton from '../utils/NavButton'
import Button from '../utils/Button'
import { Settings } from '@mui/icons-material'
const Sidebar:React.FC = () => {
  return (
    <div className='col-span-2 hidden bg-zinc-800 w-full p-4 text-zinc-100 mx-4 rounded-md shadow-xl sm:flex flex-col text-md justify-between h-[83vh]'>
        <div className='flex flex-col text-md'>
      {links.map((link)=>(
        <NavButton link={link} />
      ))}
      </div>
      <div>
        <Button label='Settings' icon={Settings} className='hover:-translate-y-1 w-full hover:bg-zinc-900' />
      </div>
    </div>
  )
}

export default Sidebar
