import { IRestaurant } from "./FormDataInterface";

export interface IRestaurantTableProps {
  content: IRestaurant[];
  handleRowClick: (restaurantId: number) => void;
  currentItem: number | undefined;
}
