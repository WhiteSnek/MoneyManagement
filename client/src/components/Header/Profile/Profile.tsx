import React from 'react'
import Icon from './Icon'
import Name from './Name'
import { UserProfile } from '../../../types/UserTypes'
import DropdownIcon from '../../utils/DropdownIcon'

interface ProfileProps {
    user: UserProfile
}

const Profile:React.FC<ProfileProps> = ({user}) => {
  return (
    <div className='flex gap-4 items-center hover:bg-zinc-900 py-2 px-4 rounded-lg cursor-pointer hover:translate-x-1 transition-all'>
      <Icon src={user.image} alt={user.name} />
      {window.innerWidth > 768 && <Name name={user.name} />}
      <DropdownIcon />
    </div>
  )
}

export default Profile
