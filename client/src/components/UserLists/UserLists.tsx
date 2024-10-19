import React from 'react'
import { monthlyList } from '../../constants/user'
import List from './List/List'

const UserLists:React.FC = () => {
  return (
    <div>
      <h1 className='text-xl sm:text-3xl text-zinc-100 font-bold p-4'>Monthly Lists</h1>
      <div className='grid px-4 grid-cols-1 sm:grid-cols-3 gap-4'>
      {
        monthlyList.map((list)=>(
          <List list={list} />
        ))
      }
      </div>
    </div>
  )
}

export default UserLists
