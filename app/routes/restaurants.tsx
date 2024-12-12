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
import { Input } from "../components/ui/input";
import { useNavigate } from "@remix-run/react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { Button } from "~/components/ui/button";
import { Combobox } from "~/components/ui/combobox";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const size = Number(url.searchParams.get("size")) || 20;
  const grade = url.searchParams.get("grade") || null;
  const borough = url.searchParams.get("borough") || null;
  const cuisine = url.searchParams.get("cuisine") || null;
  const sortBy = url.searchParams.get("sortBy") || "name";
  const sortDirection = url.searchParams.get("sortDirection") || "asc";

  const apiUrl = `http://localhost:8080/api/restaurants?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}${
    grade ? `&grade=${grade}` : ""
  }${borough ? `&borough=${borough}` : ""}`;
  console.log(apiUrl, "apiUrl");
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
  const {
    content,
    totalPages,
    pageable,
  }: { content: any; totalPages: number; pageable: any } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const page = searchParams.get("page");
    const newParams = new URLSearchParams(searchParams);
    const updatedParams: { [key: string]: string } = {};

    newParams.forEach((value, key) => {
      updatedParams[key] = value;
    });

    if (page) {
      setCurrentPage(Number(page));
    }

    const parameters = ["borough", "grade", "cuisine"];
    parameters.forEach((param) => {
      if (newParams.has(param)) {
        updatedParams[param] = inputText;
      }
    });

    setSearchParams(newParams);
  }, [searchParams, inputText]);

  const handlePageChange = (newPage: number) => {
    const validPage = Number(newPage);
    if (!isNaN(validPage)) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", validPage.toString());
      setSearchParams(newParams);
    }
  };

  const handleRowClick = (restaurantId: number) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  function handleSearchSubmit(): void {
    const newParams = new URLSearchParams(searchParams);
    const parameters = ["borough", "grade", "cuisine"];

    const allParams: { [key: string]: string } = {};

    newParams.forEach((value, key) => {
      allParams[key] = value;
    });

    parameters.forEach((param) => {
      if (newParams.has(param)) {
        allParams[param] = inputText;
      }
    });

    setSearchParams(allParams);
  }

  return (
    <div className="w-3/4 flex flex-col items-center justify-center select-none">
      <div className="flex text-2xl p-3 font-bold text-white bg-black rounded-t-md w-full text-left">
        <h1 className="w-2/3 pl-5">Restaurants</h1>
        <div className="flex items-center space-x-2 w-2/4 justify-end text-right">
          <Combobox />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <Button
            type="submit"
            className="flex-shrink-0 hover:bg-gray-700 text-white rounded bg-gray-600"
            onClick={() => handleSearchSubmit()}
          >
            Search
          </Button>
        </div>
      </div>

      <div
        className="w-full p-6 rounded-b-md shadow-lg"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-h-[50vh] overflow-y-auto rounded-t-md">
          <Table className="bg-gray-100 rounded shadow">
            <TableHeader className="bg-gray-300">
              <TableRow>
                <TableHead className="w-2/5 text-left">Name</TableHead>
                <TableHead className="w-2/5 text-left">Address</TableHead>
                <TableHead className="w-1/5 text-left">Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((restaurant) => (
                <TableRow
                  key={restaurant.camis}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => handleRowClick(restaurant.camis)}
                >
                  <TableCell className="w-2/5 text-left">
                    {restaurant.name}
                  </TableCell>
                  <TableCell className="w-2/5 text-left">
                    {restaurant.street}, {restaurant.borough}
                  </TableCell>
                  <TableCell className="w-1/5 text-left">
                    {restaurant.phone}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4 w-full text-2xl p-3 font-bold text-white bg-black rounded-b-md w-full text-center">
          <div className="w-1/2 flex justify-between items-center px-8 ">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className="flex-shrink-0 px-10 py-7 text-lg cursor-pointer"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="flex-grow text-center text-hg text-lg">
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage <= totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    className="flex-shrink-0 px-10 py-7 text-lg cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="w-1/2 pl-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
