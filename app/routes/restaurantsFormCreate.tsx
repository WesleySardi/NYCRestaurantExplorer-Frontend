import { useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";

export default function RestaurantFormCreate() {
  const [formData, setFormData] = useState({
    name: "",
    cuisineType: "",
    street: "",
    borough: "",
    zipcode: "",
    phone: "",
    currentGrade: "",
    lastInspectionDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          ...formData,
          lastInspectionDate: formData.lastInspectionDate,
        }),
      });

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
    <div className="w-2/3 rounded mx-auto">
      <h1 className="bg-black text-white text-center rounded-t-md py-4 w-2/4 mx-auto font-bold text-lg">
        New Restaurant
      </h1>
      <div
        className="p-6 w-1/2 mx-auto  justify-center items-center min-h-[50vh] rounded-b-md shadow-lg border-b border-l border-gray-300"
        style={{ backgroundColor: "#19213B" }}
      >
        <div
          className="restaurant-form w-full p-4 rounded overflow-y-auto max-h-[400px] w-1/2 pl-4 rounded"
          style={{ backgroundColor: "#27304F" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
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
              <label htmlFor="currentGrade" className="block text-white mb-2">
                Current Grade:
              </label>
              <input
                className="w-full p-2 text-black rounded"
                style={{ backgroundColor: "white" }}
                type="text"
                id="currentGrade"
                name="currentGrade"
                placeholder="Restaurant's current grade"
                value={formData.currentGrade}
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
          </form>
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-4 py-2 text-white rounded bg-green-800 hover:bg-gray-700"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
