import React, { useState } from 'react';
import { convertCurrency, formatAmount } from '../../../../utilityFunctions/currencyUtilities';
import truncateText from '../../../../utilityFunctions/truncateText';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCurrency } from '../../../../providers/CurrencyProvider';
import Popup from './Popup';

interface ProductProps {
  product: {
    title: string;
    image: string;
    specifications: string;
    price: number;
    quantity: number;
    priority: number;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const {currency} = useCurrency()
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: product.title,
  });
  const [open, setOpen] = useState<boolean>(false)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const togglePopup = () => {
    setOpen(!open)
  }
  return (
    <div className='text-zinc-100 p-2 rounded-md bg-zinc-900'>
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={togglePopup}
      className="w-full flex justify-between"
    >
      <div className='flex flex-col items-start'>
        <h1 className="text-lg font-bold">{truncateText(product.title, 20)}</h1>
        <p className="text-lg font-thin">
          Price: <sup>{currency.symbol}</sup> {formatAmount(convertCurrency(product.price, currency.code))}
        </p>
        <p className="text-lg text-zinc-500">Quantity: {product.quantity}</p>
      </div>
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="h-20 aspect-square object-cover rounded-md"
        />
      </div>
      
    </button>
    {open && <Popup product={product} togglePopup={togglePopup}/>}
    </div>
  );
};

export default Product;
