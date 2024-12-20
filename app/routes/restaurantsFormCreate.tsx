import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import AddInspectionDialog from "~/personalcomponents/AddInspectionsDialog";
import RestaurantForm from "~/personalcomponents/RestaurantFormCreate";
import URLs from "~/utils/urls";

export default function RestaurantFormCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRestaurantCreate>({
    name: null,
    street: null,
    borough: null,
    zipcode: null,
    phone: null,
    cuisineDescription: null,
    currentGrade: "N",
    lastInspectionDate: new Date().toISOString(),
  });

  const handleSubmit = async () => {
    const fieldsToCheck: (keyof IRestaurantCreate)[] = [
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
      const response: Response = await fetch(`${URLs.BASIC}/api/restaurants`, {
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

        navigate(`/restaurants`);
      } else {
        const errorText = await response.text();
        toast.error(`Failed to add restaurant: ${errorText}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-2/3 rounded mx-auto">
      <h1 className="bg-black text-white text-center rounded-t-md py-4 w-2/4 mx-auto font-bold text-lg">
        New Restaurant
      </h1>
      <div className="px-6 w-1/2 mx-auto  justify-center items-center h-[70vh] rounded-b-md shadow-lg border-b border-l border-gray-300 bg-[#161616]">
        <div className="restaurant-form w-full p-4 rounded overflow-y-auto w-1/2 rounded h-[60vh] bg-[#202020]">
          <RestaurantForm formData={formData} setFormData={setFormData} />
        </div>
        <div className="pt-[2vh] h-[10vh] ">
          <AddInspectionDialog
            trigger={
              <Button
                type="submit"
                className="w-full text-white rounded bg-green-800 hover:bg-gray-700 h-[6vh]"
              >
                Create
              </Button>
            }
            title={"Are you absolutely sure?"}
            content={"This will add a new restaurant to the list."}
            handleAction={handleSubmit}
            type="message"
          />
        </div>
      </div>
    </div>
  );
}
