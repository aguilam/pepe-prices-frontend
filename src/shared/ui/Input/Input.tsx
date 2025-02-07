import React from "react";

interface InputProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>; // Теперь принимает setState
  className?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = React.memo(
  ({ value, onChange, className, placeholder }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Преобразуем event в строку
        className={`${className} bg-input-bg border border-input-border rounded-lg placeholder:text-second-text-color p-2`}
        placeholder={placeholder}
      />
    );
  }
);

export default Input;
