import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import { getTotalPrice } from "../../../utilityFunctions/getTotalPrice";
import { convertCurrency, formatAmount } from "../../../utilityFunctions/currencyUtilities";
import { Add, Delete } from "@mui/icons-material";
import Popup from "../Popup/Popup";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCurrency } from "../../../providers/CurrencyProvider";
import { ItemType, ListType } from "../../../types/ListType";
import Confirm from "./Confirm/Confirm";

interface ListProps {
  list: ListType
}


const List: React.FC<ListProps> = ({list}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<ItemType[]>(list.items);
  const {currency} = useCurrency()
  const togglePopup = () => {
    setOpen(!open);
  };
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const toggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };
  useEffect(() => {
    const unboughtProducts = products.filter(product => !product.bought)
    setTotalPrice(getTotalPrice(unboughtProducts));
  }, [products, currency]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setProducts((prevProducts) => {
        const oldIndex = prevProducts.findIndex(
          (product) => product.name === active.id
        );
        const newIndex = prevProducts.findIndex(
          (product) => product.name === over.id
        );
        const newProducts = arrayMove(prevProducts, oldIndex, newIndex);
        
        return newProducts.map((product, index) => ({
          ...product,
          priority: index + 1,
        }));
      });
    }
  };

  return (
    <div className="bg-zinc-800 p-2 rounded-md shadow-lg relative">
      <h1 className="text-zinc-100 text-xl font-bold text-center py-3">
        {list.title.toUpperCase()}
      </h1>
      <div className="flex justify-center items-center absolute top-4 right-3 text-white gap-3">
      <button
        onClick={togglePopup}
        className="flex justify-center items-center p-1 hover:bg-zinc-900 rounded-full"
      >
        <Add sx={{ fontSize: 25 }} />
      </button>
      <button onClick={toggleConfirm} className="flex justify-center items-center p-1 hover:bg-zinc-900 rounded-full">
        <Delete sx={{fontSize: 25}} />
      </button>
      </div>
      <div className="py-3 h-80 overflow-y-scroll overflow-x-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={products.map((product) => product.name)}
            strategy={verticalListSortingStrategy}
          >
            <ol className="flex flex-col gap-2">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex justify-between items-center text-lg text-zinc-100 p-2 mt-2">
        <h1 className=" font-semibold ">Total Price: </h1>
        <p className="font-bold">
          <sup>{currency.symbol}</sup> {formatAmount(convertCurrency(totalPrice, currency.code))}
        </p>
      </div>
      {open && (
        <Popup
          togglePopup={togglePopup}
          month={list.title}
          listId={list.id}
        />
      )}
      {openConfirm && <Confirm toggleConfirm={toggleConfirm} listId={list.id} />}
    </div>
  );
};

export default List;
