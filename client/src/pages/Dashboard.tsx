import React, { useEffect } from 'react'
import UserDashboard from '../components/Dashboard/UserDashboard'
import { useUser } from '../providers/UserProvider'
import axios, { AxiosResponse } from 'axios'
import { User } from '../types/UserTypes'

const Dashboard:React.FC = () => {
  const {setUser} = useUser()
  
  return (
    <div className='h-[83vh] overflow-scroll'>
      <UserDashboard />
    </div>
  )
}

export default Dashboard
