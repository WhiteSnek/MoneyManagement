import React, { useState } from "react";
import Select from "../utils/Form/Select";
import { months } from "../../constants/months";
import Button from "../utils/Button";
import { Add } from "@mui/icons-material";
import { useList } from "../../providers/ListProvider";

const AddList: React.FC = () => {
  const formattedMonths = months.map((month) => ({
    label: month,
    value: month.toLowerCase(),
  }));
  const [title, setTitle] = useState<string>("january");
  const {addList} = useList()

  const handleSubmit = async () => {
    console.log(title)
    if (title.trim() === "") return;
    await addList(title)
  }
  return (
    <div className="absolute top-16 right-10 p-4 bg-zinc-900 rounded-lg z-50 shadow-lg">
      <Select
        title="Select Month: "
        options={formattedMonths}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button label="Add" icon={Add} className="bg-zinc-800 text-white w-full mt-4 hover:bg-zinc-950" onClickFunc={handleSubmit} />
    </div>
  );
};

export default AddList;
