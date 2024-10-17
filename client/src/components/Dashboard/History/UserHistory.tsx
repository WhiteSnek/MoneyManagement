import React from 'react'
import { history } from '../../../constants/user'
import Card from './HistoryCard/Card'

const UserHistory:React.FC = () => {
  return (
    <div className='m-4 rounded-md bg-zinc-800  p-2 text-white font-sans shadow-xl items-center'>
      <h1 className='text-xl text-center text-zinc-200 font-bold p-4'>History</h1>
      <div className='grid grid-cols-1 sm:grid-cols-5 gap-4'>
      {
        history.map((history) => (
          <Card history={history} />
        ))
      }
      </div>
    </div>
  )
}

export default UserHistory
