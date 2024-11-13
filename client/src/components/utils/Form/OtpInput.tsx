import React from "react";

interface OTPInputProps {
  value: string;
  onChange: (otp: string) => void;
  className?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, className = "" }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let otp = value.split(""); // Convert string to array to modify a single digit
    otp[index] = e.target.value; // Update the specific index
    onChange(otp.join("")); // Join array back to string and pass it up
  };

  const handleFocusNext = (index: number) => {
    const nextInput = document.getElementById(`otp-input-${index + 1}`);
    nextInput?.focus();
  };

  const handleFocusPrev = (index: number) => {
    const prevInput = document.getElementById(`otp-input-${index - 1}`);
    prevInput?.focus();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && e.currentTarget.value === "") {
      handleFocusPrev(index);
    } else if (e.key !== "Backspace" && e.currentTarget.value !== "" && index < 5) {
      handleFocusNext(index);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-md text-zinc-300 mb-2">Type OTP sent on mail:</label>
      
      <div className="flex space-x-2 justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value[index] || ""}
            onChange={(e) => handleInputChange(e, index)}
            maxLength={1}
            onFocus={(e) => e.target.select()} // Select the content on focus
            onKeyUp={(e) => handleKeyUp(e, index)} // Use KeyboardEvent here
            className="w-12 h-12 text-xl text-center bg-transparent border-2 border-zinc-600 rounded-md focus:border-zinc-500 outline-none"
            inputMode="numeric"
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
