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
    <div className="w-full max-w-md mx-auto bg-zinc-800 text-zinc-200 p-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-zinc-100">
        Add Link to the product
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Link"
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          className="bg-zinc-900 border border-zinc-600 rounded-lg p-2 text-zinc-300 focus:outline-none focus:border-zinc-500"
        />
        <div className="mt-4">
          <Button
            label="Get Details"
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-lg py-2 transition duration-200"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUrl;
