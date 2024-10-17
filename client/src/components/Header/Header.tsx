import React from 'react'
import Profile from './Profile/Profile'
import {user} from '../../constants/user'
import Amount from './Budget/Amount'
const Header:React.FC = () => {
  return (
    <div className='m-4 rounded-md bg-zinc-800 flex justify-between p-2 text-white font-sans border-[1px] border-zinc-400 items-center'>
      <div>
        <Profile user={user} />
      </div>
      <div>
        <Amount amount={10000} />
      </div>
    </div>
  )
}

export default Header
