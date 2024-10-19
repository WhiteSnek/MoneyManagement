import React from "react";
import { formatAmount } from "../../../../utilityFunctions/currencyUtilities";

interface CardProps {
  history: {
    title: string;
    specifications: string;
    image: string;
    price: number;
    quantity: number;
    dateBought: string;
  };
}

const Card: React.FC<CardProps> = ({ history }) => {
  return (
    <div className="p-4 bg-zinc-900 shadow-sm hover:-translate-y-2 transition-all hover:shadow-xl cursor-pointer rounded-md flex flex-col">
      <img src={history.image} alt={history.title} className="h-52 aspect-square object-cover rounded-md" />
      <div className="flex flex-col gap-2 py-4">
        <div>
        <h2 className="text-lg font-bold text-zinc-300">{history.title}</h2>
        <p className="text-sm text-zinc-500">{history.specifications}</p>
        </div>
        <div className="flex flex-col justify-end">
        <p className="text-sm text-zinc-400 font-semibold">Price: <sup>₹</sup> {formatAmount(history.price)}</p>
        <p className="text-sm text-zinc-400 font-semibold">Quantity: {history.quantity}</p>
        <p className="text-sm text-zinc-400 font-semibold">Date Bought: {history.dateBought}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
