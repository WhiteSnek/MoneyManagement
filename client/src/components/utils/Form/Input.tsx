import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputProps {
  label?: string;
  type?: string;
  value: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  inputMode?: "none" | "text" | "decimal" | "numeric" | "search" | "tel" | "email";
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full relative">
      {label && <label className="text-md text-zinc-300">{label}</label>}
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        className={`bg-transparent border-[1px] px-4 py-1 outline-none border-zinc-600 rounded-md w-full overflow-hidden mt-1 focus:border-zinc-500 hover:border-zinc-500 ${className}`}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-11 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-500"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      )}
    </div>
  );
};

export default Input;
