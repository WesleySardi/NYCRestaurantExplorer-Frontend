interface IInspectionsListProps {
  inspections: IInspection[];
  selectedIds: number[];
  newItemRef: React.RefObject<HTMLDivElement>;
  handleCardClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  handleChangeComboBox: (name: string, value: string, index: number) => void;
  handleDatePickerChange: (
    value: string,
    index: number,
    fieldName: string
  ) => void;
  isEditable?: boolean;
}
