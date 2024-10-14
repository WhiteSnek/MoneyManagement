import React from 'react'

const Header:React.FC = () => {
  return (
    <div className='m-4 rounded-md bg-zinc-800 flex justify-between p-4 text-white font-sans border-[1px] border-zinc-400'>
      <div>
        Profile
      </div>
      <div>
        Budget
      </div>
    </div>
  )
}

export default Header
