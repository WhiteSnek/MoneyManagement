import React from 'react'

interface SelectProps {
    value?: string | number;
    options: { label: string | number; value: string|number }[]
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    title?: string;
    className?: string
}

const Select:React.FC<SelectProps> = ({value = '',options, onChange, title, className=''}) => {
  return (
    <div className="flex gap-2 items-center">
      {title && <label className="text-md text-zinc-300 ">{title}</label>}
      <select value={value} onChange={onChange} className={`px-2 py-1 bg-zinc-800 text-white rounded-md focus:border-zinc-500 hover:border-zinc-500  ${className}`}>
        {options.map((option)=>(
            <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select
