import React, { useState } from "react";
import Select from "../../../utils/Form/Select";
import { icons } from "../../../../constants/services";
import Button from "../../../utils/Button";
import Input from "../../../utils/Form/Input";

const AddServiceNo: React.FC = () => {
  const [serviceNo, setServiceNo] = useState<string>("");
  const [service, setService] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(service);
    console.log(serviceNo);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-800 text-zinc-200 p-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-zinc-100">
        Add Service Number
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Select
          title="Select Service"
          value={service}
          options={icons.map(({ icon, title }) => ({
            label: title,
            value: icon,
          }))}
          onChange={(e) => setService(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-600 rounded-lg p-2 text-zinc-300 focus:outline-none focus:border-zinc-500"
        />
        <Input
          label="Enter Service Number"
          type="text"
          value={serviceNo}
          onChange={(e) => setServiceNo(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-600 rounded-lg p-2 text-zinc-300 focus:outline-none focus:border-zinc-500"
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

export default AddServiceNo;
