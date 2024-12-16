export interface IInspectionActionsProps {
  selectedIds: number[];
  setFormData: React.Dispatch<React.SetStateAction<IRestaurant>>;
  setIsNewItemAdded: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteInspection: () => void;
  handleDeleteRestaurant: () => void;
}
