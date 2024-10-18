import React from "react";

interface InputProps {
  label?: string;
  type?: string;
  value: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  inputMode?: "none" | "text" | "decimal" | "numeric" | "search" | "tel" | "email";
}

const Input: React.FC<InputProps> = ({label,value,onChange, type = "text", className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="text-md text-zinc-300 mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`bg-transparent border-[1px] px-4 py-1 outline-none border-zinc-600 rounded-md w-full overflow-hidden ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
