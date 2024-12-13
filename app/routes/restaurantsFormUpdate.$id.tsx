// routes/restaurants.$id.tsx
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "~/hooks/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const [isNewItemAdded, setIsNewItemAdded] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const [formData, setFormData] = useState({
    name: restaurant?.name,
    cuisineType: restaurant?.cuisineType,
    street: restaurant?.street,
    borough: restaurant?.borough,
    zipcode: restaurant?.zipcode,
    phone: restaurant?.phone,
    inspections: restaurant?.inspections.map((inspection) => ({
      id: inspection?.id,
      grade: inspection?.grade,
      criticalFlag: inspection?.criticalFlag,
      inspectionDate: formatDate(inspection?.inspectionDate),
      recordDate: formatDate(inspection?.recordDate),
    })),
  });

  function formatDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleCardClick = (e, id) => {
    if (e.target.tagName === "INPUT") return;

    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newInspections = [...formData.inspections];
    newInspections[index] = { ...newInspections[index], [name]: value };
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

  useEffect(() => {
    if (isNewItemAdded && newItemRef.current) {
      newItemRef.current.scrollIntoView({ behavior: "smooth" });
      newItemRef.current.focus();
      setIsNewItemAdded(false);
    }
  }, [isNewItemAdded, formData.inspections]);

  return (
    <div className="w-full flex rounded mx-auto">
      <div className="w-4/6 flex items-center justify-end">
        <div className="w-4/6">
          <h1 className="bg-black text-white text-center rounded-t-md py-4 mx-auto font-bold text-lg">
            Update Restaurant
          </h1>
          <div
            className="p-6 mx-auto flex justify-center items-center min-h-[50vh] rounded-b-md shadow-lg border-l border-b border-gray-300 "
            style={{ backgroundColor: "#19213B" }}
          >
            <form
              onSubmit={handleSubmit}
              className="restaurant-form w-full pt-4 rounded"
              style={{ backgroundColor: "#27304F" }}
            >
              <div className="flex w-full overflow-y-auto max-h-[700px] w-1/2 pl-4">
                <div className="w-1/2 pr-6 ">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-white mb-2">
                      Name:
                    </label>
                    <input
                      className="w-full p-2 text-black rounded"
                      style={{ backgroundColor: "white" }}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Restaurant's name"
                      value={formData.name ?? null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="cuisineType"
                      className="block text-white mb-2"
                    >
                      Cuisine Type:
                    </label>
                    <input
                      className="w-full p-2 text-black rounded"
                      style={{ backgroundColor: "white" }}
                      type="text"
                      id="cuisineType"
                      name="cuisineType"
                      placeholder="Restaurant's cuisine type"
                      value={formData.cuisineType ?? null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="street" className="block text-white mb-2">
                      Street:
                    </label>
                    <input
                      className="w-full p-2 text-black rounded"
                      style={{ backgroundColor: "white" }}
                      type="text"
                      id="street"
                      name="street"
                      placeholder="Restaurant's street"
                      value={formData.street ?? null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="borough" className="block text-white mb-2">
                      Borough:
                    </label>
                    <input
                      className="w-full p-2 text-black rounded"
                      style={{ backgroundColor: "white" }}
                      type="text"
                      id="borough"
                      name="borough"
                      placeholder="Restaurant's borough"
                      value={formData.borough ?? null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="zipcode" className="block text-white mb-2">
                      Zipcode:
                    </label>
                    <input
                      className="w-full p-2 text-black rounded"
                      style={{ backgroundColor: "white" }}
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      placeholder="Restaurant's zipcode"
                      value={formData.zipcode ?? null}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-white mb-2">
                      Phone:
                    </label>
                    <input
                      className="w-full p-2 text-black rounded"
                      style={{ backgroundColor: "white" }}
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Restaurant's phone"
                      value={formData.phone ?? null}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  {formData.inspections.map((inspection, index) => (
                    <div
                      key={index}
                      className={`rounded mb-3 p-4 ${
                        selectedIds.includes(inspection.id) ? "bg-red-900" : ""
                      }`}
                      onClick={(e) => handleCardClick(e, inspection.id)}
                    >
                      <h1 className="block text-white mb-2 border-b pb-3 font-bold">
                        Instruction {index + 1}
                      </h1>
                      <div className="mb-4">
                        <label
                          htmlFor={`grade-${index}`}
                          className="block text-white mb-2"
                        >
                          Grade:
                        </label>
                        <input
                          className="w-full p-2 text-black rounded"
                          style={{ backgroundColor: "white" }}
                          type="text"
                          id={`grade-${index}`}
                          name="grade"
                          placeholder="Inspection grade"
                          value={inspection.grade ?? null}
                          onChange={(e) => handleChange(e, index)}
                          ref={
                            index === formData.inspections.length - 1
                              ? newItemRef
                              : null
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor={`criticalFlag-${index}`}
                          className="block text-white mb-2"
                        >
                          Critical Flag:
                        </label>
                        <input
                          className="w-full p-2 text-black rounded"
                          style={{ backgroundColor: "white" }}
                          type="text"
                          id={`criticalFlag-${index}`}
                          name="criticalFlag"
                          placeholder="Critical flag"
                          value={inspection.criticalFlag ?? null}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor={`inspectionDate-${index}`}
                          className="block text-white mb-2"
                        >
                          Inspection Date:
                        </label>
                        <input
                          className="w-full p-2 text-black rounded"
                          style={{ backgroundColor: "white" }}
                          type="date"
                          id={`inspectionDate-${index}`}
                          name="inspectionDate"
                          value={inspection.inspectionDate ?? null}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor={`recordDate-${index}`}
                          className="block text-white mb-2"
                        >
                          Record Date:
                        </label>
                        <input
                          className="w-full p-2 text-black rounded"
                          style={{ backgroundColor: "white" }}
                          type="date"
                          id={`recordDate-${index}`}
                          name="recordDate"
                          value={inspection.recordDate ?? null}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full py-2 text-white rounded bg-green-800 hover:bg-gray-700"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-2/6 flex flex-col">
        <Button
          className="w-1/3 ml-4 mb-4 p-8 text-white rounded bg-blue-800 hover:bg-gray-700"
          onClick={() => {
            setFormData((prevData) => ({
              ...prevData,
              inspections: [
                ...prevData.inspections,
                {
                  id: null,
                  grade: null,
                  criticalFlag: null,
                  inspectionDate: null,
                  recordDate: null,
                },
              ],
            }));
            setIsNewItemAdded(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} size="1x" className="text-black-500" />{" "}
          Add Instruction
        </Button>
        <Button className="w-1/3 ml-4 p-8 text-white rounded bg-red-800 hover:bg-gray-700">
          <FontAwesomeIcon
            icon={faTrash}
            size="1x"
            className="text-black-500"
          />{" "}
          Delete Instruction
        </Button>
      </div>
    </div>
  );
}
