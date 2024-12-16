interface IRestaurantCreate {
  name: string | null;
  street: string | null;
  borough: string | null;
  zipcode: string | null;
  phone: string | null;
  cuisineDescription: string | null;
  currentGrade: string | null;
  lastInspectionDate: Date | string;
}
