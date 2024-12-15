import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@remix-run/react";

import RestaurantTable from "~/personalcomponents/RestaurantTable";
import RestaurantTablePagination from "~/personalcomponents/RestaurantTablePagination";
import IconButton from "~/personalcomponents/IconButton";
import SearchBar from "~/personalcomponents/SearchBar";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const size = Number(url.searchParams.get("size")) || 20;
  const grade = url.searchParams.get("grade") || null;
  const borough = url.searchParams.get("borough") || null;
  const cuisineDescription = url.searchParams.get("cuisineDescription") || null;
  const sortBy = url.searchParams.get("sortBy") || "name";
  const sortDirection = url.searchParams.get("sortDirection") || "asc";

  const apiUrl = `http://localhost:8080/api/restaurants?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}${
    grade ? `&grade=${grade}` : ""
  }${borough ? `&borough=${borough}` : ""}${
    cuisineDescription ? `&cuisineDescription=${cuisineDescription}` : ""
  }`;
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
  const [isEditAllowed, setIsEditAllowed] = useState(false);
  const [currentItem, setCurrentItem] = useState<number>();
  const navigate = useNavigate();

  function handleSearchSubmit(): void {
    const newParams = new URLSearchParams(searchParams);
    const parameters = ["borough", "grade", "cuisineDescription"];

    const allParams: { [key: string]: string } = {};

    newParams.forEach((value, key) => {
      allParams[key] = value;
    });

    parameters.forEach((param) => {
      if (newParams.has(param)) {
        allParams[param] = inputText;
      }
    });

    allParams["page"] = "1";

    setSearchParams(allParams);
  }

  const handlePageChange = (newPage: number) => {
    const validPage = Number(newPage);
    if (!isNaN(validPage)) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", validPage.toString());
      setSearchParams(newParams);
    }
  };

  const handleRowClick = (restaurantId: number) => {
    setIsEditAllowed(true);
    setCurrentItem(restaurantId);
  };

  const handleCreateOrEditClick = (create: boolean) => {
    if (create) {
      navigate(`/restaurantsFormCreate`);
    } else {
      navigate(`/restaurantsFormUpdate/${currentItem}`);
    }
  };

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

    const parameters = ["borough", "grade", "cuisineDescription"];
    parameters.forEach((param) => {
      if (newParams.has(param)) {
        updatedParams[param] = inputText;
      }
    });

    setSearchParams(newParams);
  }, [searchParams, inputText]);

  return (
    <div className="w-3/4 flex flex-col items-center justify-center select-none">
      <div className="flex text-2xl p-3 font-bold text-white bg-black rounded-t-md w-full text-left bg-[#161616]">
        <h1 className="w-2/3 pl-5">Restaurants</h1>
        <SearchBar
          frameworks={[
            { value: "cuisineDescription", label: "Cuisine" },
            { value: "grade", label: "Grade" },
            { value: "borough", label: "Borough" },
          ]}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>
      <div className="w-full rounded-b-md shadow-lg h-[70vh] bg-white">
        <div className="flex h-[60vh]">
          <div className="flex flex-col w-1/12">
            <IconButton
              icon={faPlus}
              onClick={() => handleCreateOrEditClick(true)}
              className="border-b bg-[#3D4C7D]"
            />
            <IconButton
              icon={faEdit}
              onClick={() => handleCreateOrEditClick(false)}
              disabled={!isEditAllowed}
              className="bg-[#3D4C7D]"
            />
          </div>
          <div className="overflow-y-auto w-11/12">
            <RestaurantTable
              content={content}
              handleRowClick={handleRowClick}
              currentItem={currentItem}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full text-2xl font-bold text-white bg-black rounded-b-md text-center h-[10vh]">
          <div className="w-1/2 flex justify-between items-center px-8">
            <RestaurantTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
          <div className="w-1/2 pl-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
