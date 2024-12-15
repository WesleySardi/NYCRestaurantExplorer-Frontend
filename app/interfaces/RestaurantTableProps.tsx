import { IRestaurant } from "./RestaurantInterface";

export interface IRestaurantTableProps {
  content: IRestaurant[];
  handleRowClick: (restaurantId: number) => void;
  currentItem: number;
}
