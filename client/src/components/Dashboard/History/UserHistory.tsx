import React, { useEffect, useState } from "react";
import Card from "./HistoryCard/Card";
import { useItem } from "../../../providers/ItemProvider";
import { BoughtItemsType } from "../../../types/ListType";
import { CircularLoader } from "../../utils/Loaders";

const UserHistory: React.FC = () => {
  const [items, setItems] = useState<BoughtItemsType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { getBoughtItems } = useItem();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getBoughtItems();
        setItems(response);
      } catch (error) {
        console.error("Error fetching bought items:", error);
        setItems(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [getBoughtItems]);

  if (!items) return <div>Something went wrong...</div>;

  return (
    <div className="m-4 rounded-md bg-zinc-800 p-2 text-white font-sans shadow-xl items-center">
      <h1 className="text-2xl text-center text-zinc-200 font-bold p-4">
        History
      </h1>
      {loading ? (
        <CircularLoader label="Loading History..." size={40} />
      ) : items.length === 0 ? (
        <div className="flex justify-center items-center text-lg font-bold py-10">No Items bought yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {items.map((item, idx) => (
            <Card history={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
