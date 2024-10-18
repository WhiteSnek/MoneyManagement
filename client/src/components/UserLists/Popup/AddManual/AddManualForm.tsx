import React, { useState } from "react";
import Input from "../../../utils/Input";
import TextArea from "../../../utils/TextArea";
import ImageInput from "../../../utils/ImageInput";
import Button from "../../../utils/Button";

interface Details {
  name: string;
  specifications: string;
  price: number;
  image: string | File | null | ArrayBuffer; 
  quantity: number;
}

const AddManualForm: React.FC = () => {
  const [details, setDetails] = useState<Details>({
    name: "",
    specifications: "",
    price: 0,
    image: "",
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(details)
  }

  return (
      <form className=" p-4 rounded-md my-2 flex gap-2 flex-col" onSubmit={handleSubmit}>
        <Input
          label="Name:"
          type="text"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        <TextArea
          label="Specifications:"
          value={details.specifications}
          onChange={(e) =>
            setDetails({ ...details, specifications: e.target.value })
          }
        />
        <ImageInput
          label="Product Image:"
          value={details.image}
          onChange={(file) => setDetails({ ...details, image: file })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price:"
            type="text"
            value={details.price}
            inputMode="numeric"
            onChange={(e) =>
              setDetails({ ...details, price: Number(e.target.value) })
            }
          />
          <Input
            label="Quantity:"
            type="number"
            value={details.quantity}
            onChange={(e) =>
              setDetails({ ...details, quantity: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex justify-end items-center">
        <Button label="Submit" type="submit" className="bg-zinc-900 hover:bg-zinc-950 w-1/3" />
        </div>
      </form>
  );
};

export default AddManualForm;
