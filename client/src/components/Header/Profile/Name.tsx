import React from 'react'

interface NameProps {
    name: string;
}

const Name:React.FC<NameProps> = ({name}) => {
  return (
    <div className='text-sm text-zinc-200'>
      Hello, {name}
    </div>
  )
}

export default Name
