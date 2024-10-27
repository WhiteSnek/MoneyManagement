import React from 'react'
import { productCategories } from '../../constants/categories'
import List from './List/List'

const Category:React.FC = () => {
  return (
    <div>
      <h1 className='text-xl sm:text-3xl text-zinc-100 font-bold p-4'>Categorized Lists</h1>
      <div className='grid px-4 grid-cols-1 sm:grid-cols-3 gap-4'>
      {
        productCategories.map((category, idx)=>(
            <List key={idx} category={category} />
        ))
      }
      </div>
    </div>
  )
}

export default Category
