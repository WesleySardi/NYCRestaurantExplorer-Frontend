import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { faEdit, faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@remix-run/react";
import RestaurantTable from "~/personalcomponents/RestaurantTable";
import RestaurantTablePagination from "~/personalcomponents/RestaurantTablePagination";
import IconButton from "~/personalcomponents/IconButton";
import SearchBar from "~/personalcomponents/SearchBar";
import { toast } from "~/hooks/use-toast";
import URLs from "../utils/urls";

export async function loader({ request }: { [key: string]: string }) {
  const url: URL = new URL(request.url);
  const page: number = Number(url.searchParams.get("page")) || 1;
  const size: number = Number(url.searchParams.get("size")) || 20;
  const name: string | null = url.searchParams.get("name") || null;
  const grade: string | null = url.searchParams.get("grade") || null;
  const borough: string | null = url.searchParams.get("borough") || null;
  const cuisineDescription: string | null =
    url.searchParams.get("cuisineDescription") || null;
  const sortBy: string | null = url.searchParams.get("sortby") || "name";
  const sortDirection: string | null =
    url.searchParams.get("sortDirection") || "asc";
  let apiUrl: string;

  if (name != null) {
    apiUrl = `${
      URLs.BASIC
    }/api/restaurants/search?page=${page}&size=${size}&sortby=${sortBy}&sortDirection=${sortDirection}${
      name ? `&name=${name}` : ""
    }`;
  } else {
    apiUrl = `${
      URLs.BASIC
    }/api/restaurants?page=${page}&size=${size}&sortby=${sortBy}&sortDirection=${sortDirection}${`${
      grade ? `&grade=${grade}` : ""
    }${borough ? `&borough=${borough}` : ""}${
      cuisineDescription ? `&cuisineDescription=${cuisineDescription}` : ""
    }`}`;
  }

  const response: Response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Response("Failed to fetch restaurants", {
      status: response.status,
    });
  }
  const data: Object = await response.json();

  return json(data);
}

export default function Restaurants() {
  const {
    content,
    totalPages,
    pageable,
  }: { content: any; totalPages: number; pageable: any } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(20);
  const [currentOrder, setCurrentOrder] = useState<string>("name");
  const [inputText, setInputText] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<number>();
  const navigate = useNavigate();

  function handleSearchSubmit(): void {
    const newParams = new URLSearchParams(searchParams);
    const parameters: string[] = ["borough", "grade", "cuisineDescription"];
    const allParams: { [key: string]: string } = {};

    const hasRelevantParameter: boolean = parameters.some((param: string) =>
      newParams.has(param)
    );

    if (!hasRelevantParameter && inputText.length > 0 && inputText.length < 3) {
      toast.error("Type at least 3 characters.");
      return;
    }

    if (!hasRelevantParameter) {
      allParams["name"] = inputText;
    } else {
      newParams.delete("name");

      newParams.forEach((value: string, key: string) => {
        allParams[key] = value;
      });

      parameters.forEach((param: string) => {
        if (newParams.has(param)) {
          allParams[param] = inputText;
        }
      });
    }

    allParams["page"] = "1";
    allParams["size"] = "20";
    allParams["sortby"] = "name";

    setSearchParams(allParams);
  }

  const handlePageChange = (newPage: number) => {
    const validPage: number = Number(newPage);
    if (!isNaN(validPage)) {
      const newParams: URLSearchParams = new URLSearchParams(searchParams);
      newParams.set("page", validPage.toString());
      setSearchParams(newParams);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    const validLimit: number = Number(newLimit);
    if (!isNaN(validLimit)) {
      const newParams: URLSearchParams = new URLSearchParams(searchParams);
      newParams.set("size", validLimit.toString());
      setSearchParams(newParams);
    }
  };

  const handlePageOrder = (order: string) => {
    if (order) {
      const newParams: URLSearchParams = new URLSearchParams(searchParams);
      newParams.set("sortby", order);
      setSearchParams(newParams);
    }
  };

  const handleRowClick = (restaurantId: number) => {
    setIsSelected(true);
    setCurrentItem(restaurantId);
  };

  const handleCreateOrEditClick = (type: string) => {
    if (type === "create") {
      navigate(`/restaurantsFormCreate`);
    } else if (type === "update") {
      navigate(`/restaurantsFormUpdate/${currentItem}`);
    } else {
      navigate(`/restaurantsFormInfo/${currentItem}`);
    }
  };

  useEffect(() => {
    const page: string | null = searchParams.get("page");
    const limit: string | null = searchParams.get("size");
    const order: string | null = searchParams.get("sortby");
    const newParams: URLSearchParams = new URLSearchParams(searchParams);
    const updatedParams: { [key: string]: string } = {};

    newParams.forEach((value: string, key: string) => {
      updatedParams[key] = value;
    });

    if (page) {
      setCurrentPage(Number(page));
    }

    if (limit) {
      setCurrentLimit(Number(limit));
    }

    if (order) {
      setCurrentOrder(order);
    }

    const parameters: string[] = ["borough", "grade", "cuisineDescription"];
    parameters.forEach((param: string) => {
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
          inputText={inputText}
          setInputText={setInputText}
        />
      </div>
      <div className="w-full rounded-b-md shadow-lg h-[70vh] bg-white">
        <div className="flex h-[60vh]">
          <div className="flex flex-col w-1/12">
            <IconButton
              icon={faInfo}
              onClick={() => handleCreateOrEditClick("info")}
              disabled={!isSelected}
              className="border-b bg-[#3D4C7D] text-[1.5vw]"
            />
            <IconButton
              icon={faPlus}
              onClick={() => handleCreateOrEditClick("create")}
              disabled={false}
              className="border-b bg-[#3D4C7D] text-[1.5vw]"
            />
            <IconButton
              icon={faEdit}
              onClick={() => handleCreateOrEditClick("update")}
              disabled={!isSelected}
              className="bg-[#3D4C7D] text-[1.5vw]"
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
              currentLimit={currentLimit}
              currentOrder={currentOrder}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              handleLimitChange={handleLimitChange}
              handlePageOrder={handlePageOrder}
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
