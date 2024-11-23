import React from "react";
import { convertCurrency, formatAmount } from "../../../../utilityFunctions/currencyUtilities";
import { useCurrency } from "../../../../providers/CurrencyProvider";
import { BoughtItemsType } from "../../../../types/ListType";
import { formatDate } from "../../../../utilityFunctions/formatDate";
import { icons } from "../../../../constants/services";

interface CardProps {
  history: BoughtItemsType
}

const Card: React.FC<CardProps> = ({ history }) => {
  const {currency} = useCurrency()

  const serviceIcon = history.isService
  ? icons.find((item) => item.title === history.name)?.icon || null
  : null;

  return (
    <div className="p-4 bg-zinc-900 shadow-sm hover:-translate-y-2 transition-all hover:shadow-xl cursor-pointer rounded-md flex flex-col">
      {serviceIcon ? (
            <img
              src={serviceIcon} 
              alt={history.name}
              className="h-52 aspect-square object-cover rounded-md"
            />
          ) : (
            <img
              src={history.displayImage} 
              alt={history.name}
              className="h-52 aspect-square object-cover rounded-md"
            />
          )}
      <div className="flex flex-col gap-2 py-4">
        <div>
        <h2 className="text-lg font-bold text-zinc-300">{history.name}</h2>
        <p className="text-sm text-zinc-500">{history.specifications}</p>
        </div>
        <div className="flex flex-col justify-end">
        <p className="text-sm text-zinc-400 font-semibold">Price: <sup>{currency.symbol}</sup> {formatAmount(convertCurrency(history.price, currency.code))}</p>
        <p className="text-sm text-zinc-400 font-semibold">Quantity: {history.quantity}</p>
        <p className="text-sm text-zinc-400 font-semibold">Date Bought: <span className="font-normal">{formatDate(history.updatedAt)}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Card;
