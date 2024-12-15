import { useLoaderData, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "~/hooks/use-toast";
import React from "react";
import InputField from "~/personalcomponents/InputField";
import InspectionActions from "~/personalcomponents/InspectionActions";
import InspectionsList from "~/personalcomponents/InspectionList";

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

export default function RestaurantsFormUpdate() {
  const { restaurant } = useLoaderData();
  const newItemRef = useRef(null);
  const navigate = useNavigate();
  const [isNewItemAdded, setIsNewItemAdded] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [date, setDate] = React.useState<Date>();
  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    name: restaurant?.name,
    street: restaurant?.street,
    borough: restaurant?.borough,
    zipcode: restaurant?.zipcode,
    phone: restaurant?.phone,
    cuisineDescription: restaurant?.cuisineDescription,
    inspections: restaurant?.inspections.map((inspection) => ({
      id: inspection?.id,
      grade: inspection?.grade,
      criticalFlag: inspection?.criticalFlag,
      inspectionDate: inspection?.inspectionDate,
      recordDate: inspection?.recordDate,
    })),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  };

  const handleCardClick = (e, id: number) => {
    e.preventDefault();

    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleChangeComboBox = (name, value, index) => {
    let formattedValue = value;

    if (name === "date" && value) {
      formattedValue = formatDate(value);
    }

    const newInspections = [...formData.inspections];
    const inspection = newInspections[index];

    const initialInspection = initialFormData[inspection.id];

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

      setFormData((prevData) => ({
        ...prevData,
        inspections: newInspections,
      }));
    }
  };

  const handleDatePickerChange = (value, index, fieldName) => {
    const newInspections = [...formData.inspections];
    newInspections[index] = {
      ...newInspections[index],
      [fieldName]: value,
    };

    setFormData((prevData) => ({
      ...prevData,
      inspections: newInspections,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/restaurants/${restaurant.camis}`,
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
        toast.success("Restaurant added successfully!");
      } else {
        const errorText = await response.text();
        toast.error(`Failed to add restaurant: ${errorText}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    console.log([...formData.inspections], "formData");
    const newInspections = [...formData.inspections];

    try {
      for (const index of selectedIds) {
        const inspection = formData.inspections[index];

        if (inspection) {
          if (inspection.id !== null) {
            const response = await fetch(
              `http://localhost:8080/api/inspections/${inspection.id}`,
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

              setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.includes(index)
                  ? prevSelectedIds.filter((selectedId) => selectedId !== index)
                  : [...prevSelectedIds, index]
              );

              setFormData({
                ...formData,
                inspections: newInspections,
              });

              navigate(`/restaurantsFormUpdate/${inspection.id}`);
            } else {
              const errorText = await response.text();
              toast.error(
                `Failed to delete inspection with id ${inspection.id}: ${errorText}`
              );
            }
          } else {
            toast.success(`Inspection ${index + 1} canceled successfully!`);

            newInspections.splice(index, 1);

            setSelectedIds((prevSelectedIds) =>
              prevSelectedIds.includes(index)
                ? prevSelectedIds.filter((selectedId) => selectedId !== index)
                : [...prevSelectedIds, index]
            );

            setFormData({
              ...formData,
              inspections: newInspections,
            });
          }
        }
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
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
    const initialData = {};
    formData.inspections.forEach((inspection) => {
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
          <div className="p-6 mx-auto flex justify-center items-center min-h-[50vh] rounded-b-md shadow-lg border-l border-b border-gray-300 bg-[#161616]">
            <form
              onSubmit={handleSubmit}
              className="restaurant-form w-full pt-4 rounded bg-[#202020]"
            >
              <div className="flex w-full overflow-y-auto max-h-[700px] w-1/2 pl-4">
                <div
                  className={`${
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
              <Button
                type="submit"
                className="w-full py-2 text-white rounded bg-green-800 hover:bg-gray-700"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
      <InspectionActions
        selectedIds={selectedIds}
        setFormData={setFormData}
        setIsNewItemAdded={setIsNewItemAdded}
        handleDelete={handleDelete}
      />
    </div>
  );
}
