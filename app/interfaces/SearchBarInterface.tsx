export interface ISearchBarProps {
  frameworks: { value: string; label: string }[];
  handleSearchSubmit: () => void;
  inputText: string;
  setInputText: (item: string) => string;
}
