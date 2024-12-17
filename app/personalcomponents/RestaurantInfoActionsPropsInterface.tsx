interface IRestaurantInfoActionsProps {
  selectedIds: string[];
  formData?: any | null;
  setFormData: (data: any | null) => void;
  setIsNewItemAdded: (value: boolean) => void;
}
