import React from 'react';
import { currencies } from '../../../constants/currency';
import { useCurrency } from '../../../providers/CurrencyProvider';

const Currency: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyCode = e.target.value;
    const selectedCurrency = currencies.find(curr => curr.code === selectedCurrencyCode);
    if (selectedCurrency) {
      setCurrency(selectedCurrency); 
    }
  };

  return (
    <div>
      <select
        value={currency.code}
        onChange={handleCurrencyChange}
        className="bg-zinc-900 text-zinc-100 p-2 rounded-md"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Currency;
