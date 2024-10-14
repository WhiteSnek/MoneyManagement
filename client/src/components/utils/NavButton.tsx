import React from 'react'
import { Link } from 'react-router-dom'

interface NavButtonProps {
    link: {
        label: string
        icon: React.ElementType
        path: string
    }
}

const NavButton:React.FC<NavButtonProps> = ({link}) => {
  return (
    <Link to={link.path} className='p-2 text-center flex gap-4 items-center border-b-[0.5px] border-zinc-500 my-2 hover:-translate-y-1 hover:bg-zinc-900 hover:rounded-md hover:border-0 hover:shadow transition-all'>
            <link.icon />
            <span className=''>{link.label}</span>
    </Link>
  )
}

export default NavButton
