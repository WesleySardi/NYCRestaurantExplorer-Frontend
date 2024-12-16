export interface IInspection {
  id: number;
  grade: string;
  inspectionDate: string;
  criticalFlag: string;
  recordDate: string | null;
}

export interface IRestaurant {
  name: string;
  street: string;
  borough: string;
  zipcode: string;
  phone: string;
  cuisineDescription: string;
  inspections: IInspection[];
}
