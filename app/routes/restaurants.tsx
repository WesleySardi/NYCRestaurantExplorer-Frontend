import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const size = Number(url.searchParams.get("size")) || 20;
  const sortBy = url.searchParams.get("sortBy") || "name";
  const sortDirection = url.searchParams.get("sortDirection") || "asc";

  const apiUrl = `http://localhost:8080/api/restaurants?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Response("Failed to fetch restaurants", {
      status: response.status,
    });
  }
  const data = await response.json();

  return json(data);
}

export default function Restaurants() {
  const { content, totalPages, pageable } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    console.log(newPage, "newPage");
    const validPage = Number(newPage);
    if (!isNaN(validPage)) {
      setSearchParams({ page: validPage.toString() });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <div className="h-96 overflow-y-scroll bg-gray-100 rounded shadow">
        <ul>
          {content.map((restaurant) => (
            <li key={restaurant.camis} className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p>
                {restaurant.street}, {restaurant.borough}
              </p>
              <p>{restaurant.phone}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
