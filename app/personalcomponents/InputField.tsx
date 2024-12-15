import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-white mb-2">
        {label}:
      </label>
      <input
        className="w-full p-2 text-black rounded"
        style={{ backgroundColor: "white" }}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
