import React from 'react'
import { formatAmount } from '../../../../utilityFunctions/currencyUtilities'
import truncateText from '../../../../utilityFunctions/truncateText'

interface ProductProps{
    product : {
        title: string
        image: string
        price: number
        quantity: number
    }
}

const Product:React.FC<ProductProps> = ({product}) => {
  return (
    <div className='text-zinc-100 p-2 rounded-md bg-zinc-900 flex justify-between'>
        <div>
      <h1 className='text-lg font-bold'>{truncateText(product.title, 20)}</h1>
      <p className='text-lg font-thin'>Price: <sup>₹</sup> {formatAmount(product.price)}</p>
      <p className='text-lg text-zinc-500'>Quantity: {product.quantity}</p>
      </div>
      <div>
        <img src={product.image} alt={product.title} className='h-20 aspect-square object-cover rounded-md' />
      </div>
    </div>
  )
}

export default Product
