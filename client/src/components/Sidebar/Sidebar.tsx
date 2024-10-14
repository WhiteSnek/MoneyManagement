import React from 'react'
import {links} from './index'
import NavButton from '../utils/NavButton'
const Sidebar:React.FC = () => {
  return (
    <div className='col-span-2 bg-zinc-800 w-full p-4 text-zinc-100 mx-4 rounded-md border-[1px] border-zinc-400 flex flex-col text-md justify-between h-[85vh]'>
        <div className='flex flex-col text-md'>
      {links.map((link)=>(
        <NavButton link={link} />
      ))}
      </div>
      <div>
        <button>Settings</button>
      </div>
    </div>
  )
}

export default Sidebar
