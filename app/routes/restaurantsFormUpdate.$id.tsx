import { useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "~/hooks/use-toast";
import React from "react";
import InputField from "~/personalcomponents/InputField";
import InspectionActions from "~/personalcomponents/InspectionActions";
import InspectionsList from "~/personalcomponents/InspectionList";
import AddInspectionDialog from "~/personalcomponents/AddInspectionsDialog";
import { IInspection, IRestaurant } from "~/interfaces/FormDataInterface";
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
  const navigate = useNavigate();
  const [isNewItemAdded, setIsNewItemAdded] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [initialFormData, setInitialFormData] = useState<IRestaurant | null>(
    null
  );
  const [formData, setFormData] = useState<IRestaurant>({
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

  const formatDate = (dateString: string) => {
    const date: Date = new Date(dateString);

    const formattedDate: string = date.toISOString().split("T")[0];

    return formattedDate;
  };

  const handleCardClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    setSelectedIds((prevSelectedIds: number[]) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId: number) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    setFormData((prevData: IRestaurant) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleChangeComboBox = (name: string, value: string, index: number) => {
    let formattedValue: string = value;

    if (name === "date" && value) {
      formattedValue = formatDate(value);
    }

    const newInspections: IInspection[] = [...formData.inspections];
    const inspection: IInspection = newInspections[index];

    const initialInspection: IInspection = initialFormData[inspection.id];

    if (formattedValue) {
      newInspections[index] = {
        ...inspection,
        [name]: formattedValue,
        inspectionDate: new Date().toISOString(),
      };

      if (
        initialInspection &&
        initialInspection.grade === newInspections[index].grade &&
        initialInspection.criticalFlag === newInspections[index].criticalFlag
      ) {
        newInspections[index] = {
          ...newInspections[index],
          inspectionDate: initialInspection.inspectionDate,
        };
      }

      setFormData((prevData: IRestaurant) => ({
        ...prevData,
        inspections: newInspections,
      }));
    }
  };

  const handleDatePickerChange = (
    value: string,
    index: number,
    fieldName: string
  ) => {
    const newInspections: IInspection[] = [...formData.inspections];
    newInspections[index] = {
      ...newInspections[index],
      [fieldName]: value,
    };

    setFormData((prevData: IRestaurant) => ({
      ...prevData,
      inspections: newInspections,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldsToCheck: string[] = [
      "name",
      "street",
      "borough",
      "zipcode",
      "phone",
      "cuisineDescription",
    ];

    for (let field of fieldsToCheck) {
      if (!formData[field]) {
        toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`
        );
        return;
      }
    }

    try {
      const response: Response = await fetch(
        `/api/restaurants/${restaurant.camis}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Restaurant updated successfully!");

        navigate(`/restaurants`);
      } else {
        const errorText = await response.text();
        toast.error(`Failed to update restaurant: ${errorText}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleDeleteInspection = async () => {
    const newInspections: IInspection[] = [...formData.inspections];

    try {
      for (const index of selectedIds) {
        const inspection: IInspection = formData.inspections[index];

        if (inspection) {
          if (inspection.id !== null) {
            const response: Response = await fetch(
              `/api/inspections/${inspection.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "*/*",
                },
              }
            );

            if (response.ok) {
              toast.success(
                `Inspection with id ${inspection.id} deleted successfully!`
              );
              newInspections.splice(index, 1);

              setSelectedIds((prevSelectedIds: number[]) =>
                prevSelectedIds.includes(index)
                  ? prevSelectedIds.filter(
                      (selectedId: number) => selectedId !== index
                    )
                  : [...prevSelectedIds, index]
              );

              setFormData({
                ...formData,
                inspections: newInspections,
              });
            } else {
              const errorText: string = await response.text();
              toast.error(
                `Failed to delete inspection with id ${inspection.id}: ${errorText}`
              );
            }
          } else {
            toast.success(`Inspection ${index + 1} canceled successfully!`);

            newInspections.splice(index, 1);

            setSelectedIds((prevSelectedIds: number[]) =>
              prevSelectedIds.includes(index)
                ? prevSelectedIds.filter(
                    (selectedId: number) => selectedId !== index
                  )
                : [...prevSelectedIds, index]
            );

            setFormData({
              ...formData,
              inspections: newInspections,
            });
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleDeleteRestaurant = async () => {
    try {
      if (restaurant) {
        const response: Response = await fetch(
          `/api/restaurants/${restaurant.camis}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );

        if (response.ok) {
          toast.success(`Restaurant ${restaurant.name} deleted successfully!`);

          navigate(`/restaurants`);
        } else {
          toast.error(
            `Failed to delete restaurant with id ${restaurant.camis}.`
          );
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (isNewItemAdded && newItemRef.current) {
      newItemRef.current.scrollIntoView({ behavior: "smooth" });
      newItemRef.current.focus();
      setIsNewItemAdded(false);
    }
  }, [isNewItemAdded, formData.inspections]);

  useEffect(() => {
    const initialData: { [key: number]: IInspection } = {};
    formData.inspections.forEach((inspection: IInspection) => {
      initialData[inspection.id] = {
        ...inspection,
      };
    });

    setInitialFormData(initialData);
  }, []);

  return (
    <div className="w-full flex rounded mx-auto">
      <div className="w-4/6 flex items-center justify-end">
        <div className="w-4/6">
          <h1 className="bg-black text-white text-center rounded-t-md py-4 mx-auto font-bold text-lg">
            Update Restaurant
          </h1>
          <div className="h-[70vh] mx-auto flex justify-center items-center rounded-b-md shadow-lg border-l border-b border-gray-300 bg-[#161616]">
            <form
              onSubmit={handleSubmit}
              className="restaurant-form w-full rounded bg-[#202020]"
            >
              <div className="flex w-full overflow-y-auto w-1/2 h-[65vh] px-[1vw]">
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
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
                {formData.inspections.length > 0 ? (
                  <InspectionsList
                    inspections={formData.inspections}
                    selectedIds={selectedIds}
                    newItemRef={newItemRef}
                    handleCardClick={handleCardClick}
                    handleChangeComboBox={handleChangeComboBox}
                    handleDatePickerChange={handleDatePickerChange}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="h-[5vh]">
                <AddInspectionDialog
                  trigger={
                    <Button className="h-full w-full text-white rounded bg-green-800 hover:bg-gray-700">
                      Save
                    </Button>
                  }
                  title={"Are you absolutely sure?"}
                  content={
                    "This will update a restaurant and its inspections in the list."
                  }
                  handleAction={handleSubmit}
                  type="message"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <InspectionActions
        selectedIds={selectedIds}
        setFormData={setFormData}
        setIsNewItemAdded={setIsNewItemAdded}
        handleDeleteInspection={handleDeleteInspection}
        handleDeleteRestaurant={handleDeleteRestaurant}
      />
    </div>
  );
}
