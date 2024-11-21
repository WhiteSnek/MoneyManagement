import React, { useEffect, useState } from "react";
import List from "./List/List";
import { useList } from "../../providers/ListProvider";
import Button from "../utils/Button";
import { Add } from "@mui/icons-material";
import AddList from "./AddList";
import { sortListsByMonth } from "../../utilityFunctions/sortedLists";

const UserLists: React.FC = () => {
  const { lists, getLists } = useList();
  const [add, setAdd] = useState<boolean>(false)
  useEffect(() => {
    getLists();
  }, []);
  if (!lists) return <div>Something went wrong...</div>;
  const sortedLists = sortListsByMonth(lists);
  return (
    <div className="relative">
      <div className="flex justify-between items-center pr-10">
      <h1 className="text-xl sm:text-3xl text-zinc-100 font-bold p-4">
        Monthly Lists
      </h1>
      <Button label="Add List" className="bg-zinc-200 hover:bg-zinc-300 text-black" icon={Add} onClickFunc={()=>setAdd(!add)}/>
      {
        add && <AddList />
      }
      </div>
      <div className="grid px-4 grid-cols-1 sm:grid-cols-3 gap-4">
        {sortedLists.map((list) => (
            <List list={list} key={list.id} />
        ))}
      </div>
    </div>
  );
};

export default UserLists;
