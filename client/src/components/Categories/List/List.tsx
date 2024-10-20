import React, { useEffect, useMemo, useState } from "react";
import { monthlyList } from "../../../constants/user";
import Product from "../../UserLists/List/Product/Product";
import { useCurrency } from "../../../providers/CurrencyProvider";
import { getTotalPrice } from "../../../utilityFunctions/getTotalPrice";
import { convertCurrency, formatAmount } from "../../../utilityFunctions/currencyUtilities";

interface CategoryProps {
  category: string;
}

const List: React.FC<CategoryProps> = ({ category }) => {
    const allProducts = useMemo(() => monthlyList.flatMap(monthData => monthData.products), []);

    const products = useMemo(() => allProducts.filter((product) => product.category === category), [allProducts, category]);

  const {currency} = useCurrency()
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(getTotalPrice(products));
  }, [products, currency]);
  if (products.length === 0) {
    return (
      <div className="bg-zinc-800 p-2 rounded-md shadow-lg relative">
        <h1 className="text-zinc-100 text-xl font-bold text-center py-3">{category}</h1>
        <p className="text-zinc-300 text-center">No products available in this category</p>
      </div>
    );
  }
  return (
    <div className="bg-zinc-800 p-2 rounded-md shadow-lg relative">
      <h1 className="text-zinc-100 text-xl font-bold text-center py-3">
        {category}
      </h1>
      <div className="py-3 h-80 overflow-y-scroll overflow-x-hidden">
        <ol className="flex flex-col gap-2">
          {products.map((product) => (
            <Product key={product.title} product={product} />
          ))}
        </ol>
      </div>
      <div className="flex justify-between items-center text-lg text-zinc-100 p-2 mt-2">
        <h1 className=" font-semibold ">Total Price: </h1>
        <p className="font-bold">
          <sup>{currency.symbol}</sup> {formatAmount(convertCurrency(totalPrice, currency.code))}
        </p>
      </div>
    </div>
  );
};

export default List;
