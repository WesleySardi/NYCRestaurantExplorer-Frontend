// routes/restaurants.$id.tsx
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export async function loader({ params }) {
  const { id } = params;
  const apiUrl = `http://localhost:8080/api/restaurants/${id}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Response("Failed to fetch restaurant details", {
      status: response.status,
    });
  }
  const data = await response.json();
  return { restaurant: data };
}

export default function RestaurantsDetails() {
  const { restaurant } = useLoaderData();

  return (
    <div className="items-center justify-between">
      <div className="text-left bg-gray-300 rounded">
        <h1 className="pl-2 flex items-center text-3xl font-bold pb-1 pt-1 text-xl font-medium text-black w-full bg-white rounded-t-md">
          <FontAwesomeIcon
            icon={faTags}
            size="1x"
            className="text-black-500 mr-2"
          />
          {restaurant.name}
        </h1>
        <h1 className="pl-2 flex items-center text-3xl font-bold pb-1 pt-1 text-xl font-medium text-black w-full">
          <FontAwesomeIcon
            icon={faLocationDot}
            size="1x"
            className="text-black-500 mr-2"
          />
          {restaurant.street}, {restaurant.borough}
        </h1>
        <h1 className="pl-2 flex items-center text-3xl font-bold pb-1 pt-1 text-xl font-medium text-black w-full bg-white rounded-b-md">
          <FontAwesomeIcon
            icon={faPhone}
            size="1x"
            className="text-black-500 mr-2"
          />
          {restaurant.phone}
        </h1>
      </div>
      <Button
        variant="default"
        className="flex-shrink-0 px-10 py-7 text-lg hover:bg-gray-700 text-white px-4 py-2 rounded w-full bg-gray-600 mt-2"
        onClick={() => alert("Button clicked")}
      >
        Action
      </Button>
    </div>
  );
}
