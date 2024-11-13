import { Close, ShoppingCartCheckout } from '@mui/icons-material';
import React from 'react';
import { useCurrency } from '../../../../providers/CurrencyProvider';
import Button from '../../../utils/Button';
import { convertCurrency, formatAmount } from '../../../../utilityFunctions/currencyUtilities';

interface PopupProps {
  product: {
    title: string;
    image: string;
    price: number;
    specifications: string;
    quantity: number;
    priority: number;
  };
  togglePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ product, togglePopup }) => {
  const { currency } = useCurrency();

  const handleBuyNow = () => {
    const queryTitle = product.title.replace(/\s+/g, '+'); // Replace spaces with '+'
    const url = `https://www.amazon.in/s?k=${queryTitle}&crid=35DRX65TVR9MI&sprefix=mobile%2Caps%2C273&ref=nb_sb_noss_2`;
    window.open(url, '_blank'); // Open the link in a new tab
  };

  // Calculate the total price
  const totalPrice = product.price * product.quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 sm:p-8 shadow-3xl max-w-xs sm:max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Would you like to buy this product?</h2>
          <button
            onClick={togglePopup}
            className="text-white flex justify-center items-center p-2 hover:bg-zinc-700 rounded-full transition duration-200"
          >
            <Close sx={{ fontSize: window.innerWidth > 768 ? 30 : 20 }} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="col-span-1">
            <img
              src={product.image}
              alt={product.title}
              className="h-48 sm:h-56 w-full sm:w-56 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col items-start gap-2 col-span-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-100">{product.title}</h1>
            <p className='text-md sm:text-lg font-thin  text-left'>Specifications: <span className='text-zinc-400'>{product.specifications}</span></p>
            <p className="text-md sm:text-lg font-light text-zinc-400">
              Price: <span className="text-zinc-100 font-medium text-xl">{currency.symbol}{formatAmount(convertCurrency(product.price, currency.code))}</span>
            </p>
            <p className="text-md sm:text-lg text-zinc-400">
              Quantity: <span className="text-zinc-100 font-medium">{product.quantity}</span>
            </p>
            <p className="text-md sm:text-lg font-light text-zinc-400">
              Total Price: <span className="text-zinc-100 font-medium text-xl">{currency.symbol}{formatAmount(convertCurrency(totalPrice, currency.code))}</span>
            </p>
            <Button label='Buy Now' icon={ShoppingCartCheckout} className='hover:-translate-y-1 bg-zinc-900 hover:bg-zinc-950 w-1/2' onClickFunc={handleBuyNow} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
