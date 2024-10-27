import React from 'react';

interface ButtonProps {
  label: string;
  type?:"button" | "submit" | "reset" | undefined
  icon?: React.ElementType; 
  onClickFunc?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string 
}

const Button: React.FC<ButtonProps> = ({ label, type, icon: Icon, onClickFunc, className='' }) => {
  return (
    <button
    type={type}
      onClick={onClickFunc}
      className={`text-center flex justify-center items-center gap-3 px-4 py-2 rounded-md  transition-all ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />} 
      {label}
    </button>
  );
};

export default Button;
