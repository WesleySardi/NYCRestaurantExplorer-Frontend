import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function RestaurantForm() {
  const fetcher = useFetcher();

  return (
    <div className="w-2/3 rounded mx-auto">
      <h1 className="bg-black text-white text-center rounded-t-md py-4 w-2/4 mx-auto font-bold text-lg">
        New Restaurant
      </h1>
      <div
        className="p-6 w-1/2 mx-auto flex justify-center items-center min-h-[50vh] rounded-b-md shadow-lg"
        style={{ backgroundColor: "#19213B" }}
      >
        <fetcher.Form
          method="post"
          action="http://localhost:8080/api/restaurants"
          className="restaurant-form w-full max-w-lg p-4 rounded"
          style={{ backgroundColor: "#27304F" }}
        >
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
              placeholder="Teste"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 text-white rounded bg-green-800 hover:bg-gray-700"
          >
            Submit
          </Button>
        </fetcher.Form>
      </div>
    </div>
  );
}
