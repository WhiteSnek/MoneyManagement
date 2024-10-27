import React from "react";

interface TextAreaProps {
  label?: string;
  value: string | number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({label,value,onChange, className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="text-md text-zinc-300 mb-1">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        className={`bg-transparent mt-1 border-[1px] px-4 py-1 outline-none border-zinc-600 focus:border-zinc-500 hover:border-zinc-500  rounded-md w-full overflow-hidden ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextArea;
