import React, { useState } from "react";
import Input from "../../../utils/Form/Input";
import TextArea from "../../../utils/Form/TextArea";
import ImageInput from "../../../utils/Form/ImageInput";
import Button from "../../../utils/Button";
import { useCurrency } from "../../../../providers/CurrencyProvider";
import IconInput from "../../../utils/Form/IconInput";
import { AddItem } from "../../../../types/ListType";
import { useItem } from "../../../../providers/ItemProvider";
import { CircularLoader } from "../../../utils/Loaders";
import Select from "../../../utils/Form/Select";
import { useList } from "../../../../providers/ListProvider";

interface AddManualFormProps {
  details: AddItem;
  setDetails: React.Dispatch<React.SetStateAction<AddItem>>;
  togglePopup: () => void;
  service: boolean;
}

const AddManualForm: React.FC<AddManualFormProps> = ({
  details,
  setDetails,
  togglePopup,
  service,
}) => {
  const { currency } = useCurrency();
  const { addItem } = useItem();
  const {getLists} = useList()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const handleImageChange = (file: File, url: string) => {
    setDetails({ ...details, displayImage: file});
    setImageUrl(url)
  };
  
  const categories = service ? [
    {label : 'Bills', value: 'bills'},
    {label : 'Investments', value: 'investments'}
  ] : [
    {label : 'Clothing', value: 'clothing'},
    {label : 'Electronics', value: 'electronics'},
    {label : 'Home', value: 'home'},
    {label : 'Health', value: 'health'},
    {label : 'Groceries', value: 'groceries'},
    {label : 'Sports', value: 'sports'},

  ]
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(details)
    const { name, specifications, price, displayImage, quantity,listId, category } = details;
    if(name === '' || specifications === '' || price === '' || !displayImage || quantity ==='0' || !listId){
      console.log('Enter all the details')
      return;
    }
    const prodDetails: AddItem = {
      name,
      specifications,
      price,
      displayImage,
      quantity,
      isService: service ? "true" : "false",
      category,
      link: "",
      listId
    };
    console.log(prodDetails)
    setLoading(true)
    const response = await addItem(prodDetails);
    if(response === "success"){
      await getLists()
      togglePopup()
    }
    else {
      alert('Failed to add item')
    }
    setLoading(false)
    togglePopup()
  };

  if(loading) return <CircularLoader label="Adding the item to your list..." size={50} />

  return (
    <form
      className="p-4 rounded-md my-2 flex gap-2 flex-col"
      onSubmit={handleSubmit}
    >
      <Input
        label="Name:"
        type="text"
        value={details.name}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      {!service && (
        <TextArea
          label="Specifications:"
          value={details.specifications}
          onChange={(e) =>
            setDetails({ ...details, specifications: e.target.value })
          }
        />
      )}
      {service ? (
        <IconInput
          label="Product Icon: "
          value={imageUrl || ""}
          onChange={(file) => setDetails({ ...details, displayImage: file })}
        />
      ) : (
        <ImageInput
          label="Product Image:"
          imageUrl={imageUrl || ""}
          setImage={handleImageChange}
        />
      )}
      <div className={`grid ${service ? "grid-cols-2" : "grid-cols-3"} gap-4`}>
        <Input
          label={`Price (in ${currency.code}):`}
          type="text"
          value={details.price}
          inputMode="numeric"
          onChange={(e) =>
            setDetails({ ...details, price: e.target.value })
          }
        />
        {!service && (
          <Input
            label="Quantity:"
            type="number"
            value={details.quantity}
            onChange={(e) =>
              setDetails({ ...details, quantity: e.target.value })
            }
          />
        )}
        <Select title="Category: " options={categories} value={details.category} onChange={(e)=>setDetails({...details, category: e.target.value})} className="bg-zinc-900 w-full" />
      </div>
      <div className="flex justify-end items-center">
        <Button
          label="Submit"
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-950 w-1/3"
        />
      </div>
    </form>
  );
};

export default AddManualForm;
