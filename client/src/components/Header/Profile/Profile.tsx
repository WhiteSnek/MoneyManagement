import React from 'react'
import Icon from './Icon'
import Name from './Name'
import DropdownIcon from '../../utils/DropdownIcon'
import { useUser } from '../../../providers/UserProvider'

const Profile:React.FC = () => {
  const {user} = useUser();
  if(!user) return null
  return (
    <div className='flex gap-4 items-center hover:bg-zinc-900 py-2 px-4 rounded-lg cursor-pointer hover:translate-x-1 transition-all'>
      <Icon src={user.avatar} alt={user.fullname} />
      {window.innerWidth > 768 && <Name name={user.fullname} />}
      <DropdownIcon />
    </div>
  )
}

export default Profile
