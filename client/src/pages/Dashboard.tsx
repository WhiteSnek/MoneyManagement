import React from 'react'
import UserDashboard from '../components/Dashboard/UserDashboard'

const Dashboard:React.FC = () => {
  return (
    <div className='h-[83vh] overflow-scroll'>
      <UserDashboard />
    </div>
  )
}

export default Dashboard
