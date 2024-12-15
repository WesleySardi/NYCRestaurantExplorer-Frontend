import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../components/ui/table";
import { IRestaurantTableProps } from "~/interfaces/RestaurantTableProps";

const RestaurantTable: React.FC<IRestaurantTableProps> = ({
  content,
  handleRowClick,
  currentItem,
}) => {
  return (
    <Table className="bg-white shadow">
      <TableHeader className="bg-gray-300">
        <TableRow>
          <TableHead className="w-1/4 text-left">Name</TableHead>
          <TableHead className="w-1/4 text-left">Address</TableHead>
          <TableHead className="w-1/4 text-left">Phone</TableHead>
          <TableHead className="w-1/4 text-left">Cuisine</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {content.map((restaurant) => (
          <TableRow
            key={restaurant.camis}
            className={`cursor-pointer hover:bg-gray-200 ${
              currentItem === restaurant.camis && "bg-[#8AA7CE]"
            }`}
            onClick={() => handleRowClick(restaurant.camis)}
          >
            <TableCell className="w-1/4 text-left">{restaurant.name}</TableCell>
            <TableCell className="w-1/4 text-left">
              {restaurant.street}, {restaurant.borough}
            </TableCell>
            <TableCell className="w-1/4 text-left">
              {restaurant.phone}
            </TableCell>
            <TableCell className="w-1/4 text-left">
              {restaurant.cuisineDescription}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RestaurantTable;
