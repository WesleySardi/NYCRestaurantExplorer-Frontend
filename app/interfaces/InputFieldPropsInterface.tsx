export interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string | number | readonly string[] | undefined | any;
  onChange: (e: any) => void;
  required?: boolean;
  disabled: boolean;
  type: string;
}
