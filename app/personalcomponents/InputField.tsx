import { InputFieldProps } from "~/interfaces/InputFieldPropsInterface";

const InputField = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  type = "text",
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-white mb-2">
        {label}:
      </label>
      <input
        className="w-full p-2 text-black rounded bg-white"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={30}
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
