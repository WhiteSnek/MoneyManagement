import React from "react";
import Input from "../../../utils/Form/Input";
import TextArea from "../../../utils/Form/TextArea";
import ImageInput from "../../../utils/Form/ImageInput";
import Button from "../../../utils/Button";
import { ProductDetails } from "../Popup";
import { Products } from "../../List/List";
import { useCurrency } from "../../../../providers/CurrencyProvider";

interface AddManualFormProps {
  details: ProductDetails;
  setDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  products: Products[];
  togglePopup: ()=>void;
}

const AddManualForm: React.FC<AddManualFormProps> = ({
  details,
  setDetails,
  setProducts,
  products,
  togglePopup,
}) => {
  const {currency} = useCurrency()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, imageUrl, price, quantity } = details;

    if (!name || !imageUrl || !price) {
      alert("Please fill in all required fields.");
      return;
    }
    setProducts([
      ...products,
      { title: name, image: imageUrl, price: price, quantity: quantity, priority: 1 },
    ]);
    togglePopup();
  };

  return (
    <form className="p-4 rounded-md my-2 flex gap-2 flex-col" onSubmit={handleSubmit}>
      <Input
        label="Name:"
        type="text"
        value={details.name}
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      <TextArea
        label="Specifications:"
        value={details.specifications}
        onChange={(e) => setDetails({ ...details, specifications: e.target.value })}
      />
      <ImageInput
        label="Product Image:"
        value={details.image}
        onChange={(file) => setDetails({ ...details, image: file })}
        details={details}
        setDetails={setDetails}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={`Price (in ${currency.code}):`}
          type="text"
          value={details.price}
          inputMode="numeric"
          onChange={(e) => setDetails({ ...details, price: Number(e.target.value) })}
        />
        <Input
          label="Quantity:"
          type="number"
          value={details.quantity}
          onChange={(e) => setDetails({ ...details, quantity: Number(e.target.value) })}
        />
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
