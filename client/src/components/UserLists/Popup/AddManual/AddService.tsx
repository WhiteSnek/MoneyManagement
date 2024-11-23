import React, { useState } from "react";
import Input from "../../../utils/Form/Input";
import Button from "../../../utils/Button";
import { useCurrency } from "../../../../providers/CurrencyProvider";
import { AddItem } from "../../../../types/ListType";
import { useItem } from "../../../../providers/ItemProvider";
import { CircularLoader } from "../../../utils/Loaders";
import Select from "../../../utils/Form/Select";
import { useList } from "../../../../providers/ListProvider";

interface AddManualFormProps {
  details: AddItem;
  setDetails: React.Dispatch<React.SetStateAction<AddItem>>;
  togglePopup: () => void;
}

const AddService: React.FC<AddManualFormProps> = ({
  details,
  setDetails,
  togglePopup,
}) => {
  const { currency } = useCurrency();
  const { addItem } = useItem();
  const { getLists } = useList();
  const [loading, setLoading] = useState<boolean>(false);

  // Service Options
  const options = [
    { label: "Electricity Bill", value: "Electricity bill" },
    { label: "Water Bill", value: "Water Bill" },
    { label: "Gas Bill", value: "Gas Bill" },
    { label: "Car Loan", value: "Car Loan" },
    { label: "Education Bill", value: "Education Bill" },
    { label: "Gym Fees", value: "Gym Fees" },
    { label: "Health Insurance", value: "Health Insurance" },
    { label: "House Rent", value: "House Rent" },
    { label: "Internet Bill", value: "Internet Bill" },
    { label: "Life Insurance", value: "Life Insurance" },
    { label: "Medicine Bill", value: "Medicine Bill" },
    { label: "Mobile Recharge", value: "Mobile Recharge" },
  ];

  // Category Options
  const categories = [
    { label: "Bills", value: "bills" },
    { label: "Investments", value: "investments" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, price, category, listId } = details;

    // Basic Validation
    if (!name || !price || !category) {
      alert("Please fill all the fields.");
      return;
    }

    const prodDetails: AddItem = {
      name,
      specifications: '',
      price,
      quantity: '1',
      displayImage: null,
      link: '',
      isService: "true",
      category,
      listId,
    };

    setLoading(true);

    const response = await addItem(prodDetails);
    if (response === "success") {
      await getLists();
      togglePopup();
    } else {
      alert("Failed to add item");
    }

    setLoading(false);
  };

  if (loading)
    return <CircularLoader label="Adding the item to your list..." size={50} />;

  return (
    <form
      className="p-4 rounded-md my-2 flex gap-2 flex-col"
      onSubmit={handleSubmit}
    >
      <Select
        title="Name of Service:"
        value={details.name}
        options={options}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
        className="bg-zinc-900"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={`Price (in ${currency.code}):`}
          type="text"
          value={details.price}
          inputMode="numeric"
          onChange={(e) =>
            setDetails({ ...details, price: e.target.value })
          }
        />
        <Select
          title="Category:"
          options={categories}
          value={details.category}
          onChange={(e) =>
            setDetails({ ...details, category: e.target.value })
          }
          className="bg-zinc-900 w-full"
        />
      </div>
      <div className="flex justify-end items-center">
        <Button
          label="Submit"
          type="submit"
          className={`bg-zinc-900 hover:bg-zinc-950 w-1/3 ${
            !details.name || !details.price || !details.category
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={!details.name || !details.price || !details.category}
        />
      </div>
    </form>
  );
};

export default AddService;
