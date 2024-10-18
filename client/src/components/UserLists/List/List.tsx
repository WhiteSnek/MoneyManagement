import React, { useState } from "react";
import Product from "./Product/Product";
import { getTotalPrice } from "../../../utilityFunctions/getTotalPrice";
import { formatAmount } from "../../../utilityFunctions/currencyUtilities";
import { Add } from "@mui/icons-material";
import Popup from "../Popup/Popup";

interface ListProps {
  list: {
    month: string;
    products: {
      title: string;
      image: string;
      price: number;
      quantity: number;
    }[];
  };
}

const List: React.FC<ListProps> = ({ list }) => {
  const [open,setOpen] = useState<boolean>(false)
  const togglePopup = () => {
    setOpen(!open)
  }
  return (
    <div className="bg-zinc-800 p-2 rounded-md shadow-lg relative">
      <h1 className="text-zinc-100 text-xl font-bold text-center py-3">
        {list.month}
      </h1>
      <button onClick={togglePopup} className="text-white absolute top-4 right-3 flex justify-center items-center p-1 hover:bg-zinc-900 rounded-full">
        <Add sx={{fontSize: 30}} />
      </button>
      <div className="py-3">
        <ol className="flex flex-col gap-2">
          {list.products.map((product) => (
            <li key={product.title}>
              <Product product={product} />
            </li>
          ))}
        </ol>
      </div>
      <div className="flex justify-between items-center text-lg text-zinc-100 p-2">
        <h1 className=" font-semibold ">Total Price: </h1>
        <p className="font-bold">
          <sup>₹</sup> {formatAmount(getTotalPrice(list.products))}
        </p>
      </div>
      {
        open && <Popup togglePopup={togglePopup} month={list.month} />
      }
    </div>
  );
};

export default List;
