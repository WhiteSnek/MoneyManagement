import React from 'react'

interface ButtonProps{
  label: string,
  icon: React.ElementType
  // onClickFunc: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Button:React.FC<ButtonProps> = ({label, icon: Icon}) => {
  return (
    <button className='text-center flex justify-center items-center gap-3 w-full hover:bg-zinc-900 px-4 py-2 rounded-md hover:-translate-y-1 transition-all '>
      <Icon />
      {label}
    </button>
  )
}

export default Button
