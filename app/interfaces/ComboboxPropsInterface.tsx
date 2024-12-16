export interface IComboboxProps {
  frameworks: { value: string; label: string }[];
  value: string;
  onChange: (name: string, value: string, index: number) => void;
  name: string;
  index: number;
  disabled?: boolean;
}
