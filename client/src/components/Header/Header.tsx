import React from 'react'
import Profile from './Profile/Profile'
import Amount from './Budget/Amount'
import Currency from './Budget/Currency'
import { useUser } from '../../providers/UserProvider'
import Button from '../utils/Button'
import { useNavigate } from 'react-router-dom'
import { Login } from '@mui/icons-material'
const Header:React.FC = () => {
  const {user} = useUser()
  const navigate = useNavigate()
  const loginButton = () => {
    navigate('/login')
  }
  if(!user){
    return <div className='m-4 rounded-md bg-zinc-800 flex justify-end p-2 text-white font-sans shadow-xl items-center'>
      <Button label='Login' icon={Login} onClickFunc={loginButton} className='hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950'/>
    </div>
  }
  return (
    <div className='m-4 rounded-md bg-zinc-800 flex justify-between p-2 text-white font-sans shadow-xl items-center'>
      <div>
        <Profile />
      </div>
      <div className='px-4 flex gap-2 items-center'>
        <Currency />
        <Amount amount={user.monthlyIncome} />
      </div>
    </div>
  )
}

export default Header
