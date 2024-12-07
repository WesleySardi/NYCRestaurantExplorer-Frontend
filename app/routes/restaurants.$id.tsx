// routes/restaurants.$id.tsx
import { useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";

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
    <div>
      <h1>Name: {restaurant.name}</h1>
      <p>
        Address: {restaurant.street}, {restaurant.borough}
      </p>
      <p>Phone: {restaurant.phone}</p>
    </div>
  );
}
