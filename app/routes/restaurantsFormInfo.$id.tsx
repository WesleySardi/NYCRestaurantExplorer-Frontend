import { useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";
import InputField from "~/personalcomponents/InputField";
import InspectionsList from "~/personalcomponents/InspectionList";
import RestaurantInfoActions from "~/personalcomponents/RestaurantInfoActions";
import { IInspection, IRestaurant } from "../interfaces/FormDataInterface";
import URLs from "~/utils/urls";

const fields = [
  {
    label: "Name",
    id: "name",
    name: "name",
    placeholder: "Restaurant's name",
  },
  {
    label: "Cuisine Type",
    id: "cuisineDescription",
    name: "cuisineDescription",
    placeholder: "Restaurant's cuisine type",
  },
  {
    label: "Street",
    id: "street",
    name: "street",
    placeholder: "Restaurant's street",
  },
  {
    label: "Borough",
    id: "borough",
    name: "borough",
    placeholder: "Restaurant's borough",
  },
  {
    label: "Zipcode",
    id: "zipcode",
    name: "zipcode",
    placeholder: "Restaurant's zipcode",
  },
  {
    label: "Phone",
    id: "phone",
    name: "phone",
    placeholder: "Restaurant's phone",
  },
];

export async function loader({ params }: { [key: string]: string }) {
  const { id } = params;
  const apiUrl: string = `/api/restaurants/${id}`;
  const response: Response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Response("Failed to fetch restaurant details", {
      status: response.status,
    });
  }

  const data: Object = await response.json();

  return { restaurant: data };
}

export default function RestaurantsFormUpdate() {
  const { restaurant } = useLoaderData<any>();
  const newItemRef = useRef<HTMLDivElement>(null);
  const [selectedIds] = useState<number[]>([]);
  const [formData] = useState<IRestaurant>({
    name: restaurant?.name,
    street: restaurant?.street,
    borough: restaurant?.borough,
    zipcode: restaurant?.zipcode,
    phone: restaurant?.phone,
    cuisineDescription: restaurant?.cuisineDescription,
    inspections: restaurant?.inspections.map((inspection: IInspection) => ({
      id: inspection?.id,
      grade: inspection?.grade,
      criticalFlag: inspection?.criticalFlag,
      inspectionDate: inspection?.inspectionDate,
      recordDate: inspection?.recordDate,
    })),
  });

  return (
    <div className="w-full flex rounded mx-auto">
      <div className="w-4/6 flex items-center justify-end">
        <div className="w-4/6">
          <h1 className="bg-black text-white text-center rounded-t-md py-4 mx-auto font-bold text-lg">
            Restaurant's Info
          </h1>
          <div className="h-[70vh] p-6 mx-auto flex justify-center items-center rounded-b-md shadow-lg border-l border-b border-gray-300 bg-[#161616]">
            <form className="restaurant-form w-full pt-4 pb-4 rounded bg-[#202020] h-full">
              <div className="flex w-full overflow-y-auto w-1/2 pl-4 h-full">
                <div
                  className={`pl-5 pt-5 ${
                    formData.inspections.length > 0 ? "w-1/2" : "w-2/3 m-auto"
                  } pr-6`}
                >
                  {fields.map((field) => (
                    <div className="mb-4" key={field.id}>
                      <InputField
                        label={field.label}
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] ?? ""}
                        disabled={true}
                        type={"text"}
                      />
                    </div>
                  ))}
                </div>
                {formData.inspections.length > 0 ? (
                  <InspectionsList
                    inspections={formData.inspections}
                    selectedIds={selectedIds}
                    newItemRef={newItemRef}
                    isEditable={false}
                  />
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <RestaurantInfoActions selectedIds={selectedIds} formData={formData} />
    </div>
  );
}
