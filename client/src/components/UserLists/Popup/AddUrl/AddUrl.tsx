import React, { useState } from "react";
import Input from "../../../utils/Form/Input";
import Button from "../../../utils/Button";

const AddUrl: React.FC = () => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(url);
  };
  return (
    <div className=" pb-4">
      <form className="flex flex-col gap-2 py-4" onSubmit={handleSubmit}>
        <Input
        label="Link:"
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <div className="ml-auto">
          <Button label='Get Details' type="submit" className='bg-zinc-900 hover:bg-zinc-950' />
        </div>
      </form>
    </div>
  );
};

export default AddUrl;
