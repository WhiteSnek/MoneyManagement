import React, { useState } from "react";
import Button from "../Button";
import { Add, Remove } from "@mui/icons-material";

interface NumberInputProps {
  label?: string;
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  step?: number;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  className = "",
  step = 1,
  min,
  max,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleValueChange = (newValue: number) => {
    if ((min !== undefined && newValue < min) || (max !== undefined && newValue > max)) {
      return;
    }
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const increment = () => {
    handleValueChange(internalValue + step);
  };

  const decrement = () => {
    handleValueChange(internalValue - step);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      handleValueChange(inputValue);
    }
  };

  return (
    <div className="w-full relative grid grid-cols-5 items-center p-4 gap-4">
      {label && <label className="text-md col-span-2 text-zinc-300 mb-1">{label}</label>}
      <div className={`flex justify-center items-center ${ label ? "col-span-3" : "col-span-5"}`}>
      <Button icon={Remove} onClickFunc={decrement} className="bg-zinc-900 hover:bg-zinc-950 text-white px-3 py-2 rounded-l-md border-l border-b border-t border-zinc-600 rounded-r-none" />
      <input
        type="number"
        value={internalValue}
        onChange={handleInputChange}
        className={`bg-transparent border-t-[1px] border-b-[1px] border-zinc-600 px-4 py-2 outline-none w-full text-center focus:border-zinc-500 ${className}`}
      />
      <Button icon={Add} onClickFunc={increment} className="bg-zinc-900 hover:bg-zinc-950 text-white px-3 py-2 rounded-r-md border-r border-b border-t border-zinc-600 rounded-l-none" />
      </div>
    </div>
  );
};

export default NumberInput;
