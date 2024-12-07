import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { useNavigate } from "@remix-run/react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const validPage = Number(newPage);
    if (!isNaN(validPage)) {
      setSearchParams({ page: validPage.toString() });
    }
  };

  const handleRowClick = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen select-none"
      style={{
        backgroundColor: "black",
        backgroundImage: "url('https://wallpaperaccess.com/full/3692914.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Restaurants</h1>
      <div
        className="w-4/5 p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-h-[50vh] overflow-y-auto">
          <Table className="bg-gray-100 rounded shadow">
            <TableHeader className="bg-gray-300">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((restaurant) => (
                <TableRow
                  key={restaurant.camis}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleRowClick(restaurant.camis)}
                >
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>
                    {restaurant.street}, {restaurant.borough}
                  </TableCell>
                  <TableCell>{restaurant.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4 w-full">
          <div className="w-1/2 flex justify-between items-center px-8">
            <Button
              variant="default"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex-shrink-0"
            >
              Previous
            </Button>
            <span className="flex-grow text-center">Page {currentPage}</span>
            <Button
              variant="default"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex-shrink-0"
            >
              Next
            </Button>
          </div>

          <div className="w-1/2 pl-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
