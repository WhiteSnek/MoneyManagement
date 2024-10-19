import React from 'react'
import Profile from './Profile/Profile'
import {user} from '../../constants/user'
import Amount from './Budget/Amount'
import Currency from './Budget/Currency'
const Header:React.FC = () => {
  return (
    <div className='m-4 rounded-md bg-zinc-800 flex justify-between p-2 text-white font-sans shadow-xl items-center'>
      <div>
        <Profile user={user} />
      </div>
      <div className='px-4 flex gap-2 items-center'>
        <Currency />
        <Amount amount={10000} />
      </div>
    </div>
  )
}

export default Header
