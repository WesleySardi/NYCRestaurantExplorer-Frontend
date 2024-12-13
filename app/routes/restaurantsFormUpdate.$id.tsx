// routes/restaurants.$id.tsx
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { toast } from "~/hooks/use-toast";

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

  const [formData, setFormData] = useState({
    name: restaurant.name,
    cuisineType: restaurant.cuisineType,
    street: restaurant.street,
    borough: restaurant.borough,
    zipcode: restaurant.zipcode,
    phone: restaurant.phone,
    inspections: restaurant.inspections.map((inspection) => ({
      grade: inspection.grade,
      criticalFlag: inspection.criticalFlag,
      inspectionDate: inspection.inspectionDate,
      recordDate: inspection.recordDate,
    })),
  });

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
          body: JSON.stringify({
            ...formData,
            lastInspectionDate: formData.lastInspectionDate,
          }),
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

  return (
    <div className="w-full rounded mx-auto">
      <h1 className="bg-black text-white text-center rounded-t-md py-4 w-1/2 mx-auto font-bold text-lg">
        Update Restaurant
      </h1>
      <div
        className="p-6 w-1/2 mx-auto flex justify-center items-center min-h-[50vh] rounded-b-md shadow-lg border-l border-b border-gray-300"
        style={{ backgroundColor: "#19213B" }}
      >
        <form
          onSubmit={handleSubmit}
          className="restaurant-form w-full pt-4 rounded"
          style={{ backgroundColor: "#27304F" }}
        >
          <div className="flex w-full overflow-y-auto max-h-[400px] w-1/2 pl-4">
            <div className="w-1/2 pr-6 border-r">
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
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="cuisineType" className="block text-white mb-2">
                  Cuisine Type:
                </label>
                <input
                  className="w-full p-2 text-black rounded"
                  style={{ backgroundColor: "white" }}
                  type="text"
                  id="cuisineType"
                  name="cuisineType"
                  placeholder="Restaurant's cuisine type"
                  value={formData.cuisineType}
                  onChange={handleChange}
                  required
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
                  value={formData.street}
                  onChange={handleChange}
                  required
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
                  value={formData.borough}
                  onChange={handleChange}
                  required
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
                  value={formData.zipcode}
                  onChange={handleChange}
                  required
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
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastInspectionDate"
                  className="block text-white mb-2"
                >
                  Last Inspection Date:
                </label>
                <input
                  className="w-full p-2 text-black rounded"
                  style={{ backgroundColor: "white" }}
                  type="date"
                  id="lastInspectionDate"
                  name="lastInspectionDate"
                  value={formData.lastInspectionDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[400px] w-1/2">
              {formData.inspections.map((inspection, index) => (
                <div key={index} className="rounded mb-3 pl-6">
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
                      value={inspection.grade}
                      onChange={(e) => handleChange(e, index)}
                      required
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
                      value={inspection.criticalFlag}
                      onChange={(e) => handleChange(e, index)}
                      required
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
                      value={inspection.inspectionDate}
                      onChange={(e) => handleChange(e, index)}
                      required
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
                      value={inspection.recordDate}
                      onChange={(e) => handleChange(e, index)}
                      required
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
  );
}
