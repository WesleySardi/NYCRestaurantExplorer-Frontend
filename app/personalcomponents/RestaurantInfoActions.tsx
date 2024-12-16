import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "~/components/ui/button";
import AddInspectionDialog from "./AddInspectionsDialog";
import { useState } from "react";

const RestaurantInfoActions = ({
  selectedIds,
  formData = null,
  setFormData,
  setIsNewItemAdded,
  handleDeleteInspection,
  handleDeleteRestaurant,
}) => {
  const [grade, setGrade] = useState<null | string>("N");
  const [criticalFlag, setCriticalFlag] = useState<null | string>(
    "Undefined Critical Flag"
  );

  const handleAddInspection = () => {
    setFormData((prevData) => ({
      ...prevData,
      inspections: [
        ...prevData.inspections,
        {
          id: null,
          grade: grade,
          criticalFlag: criticalFlag,
          inspectionDate: new Date().toISOString(),
          recordDate: new Date().toISOString(),
        },
      ],
    }));
    setIsNewItemAdded(true);

    setGrade("N");
    setCriticalFlag("Undefined Critical Flag");
  };

  return (
    <div className="w-2/6 flex flex-col ">
      <div className="h-1/2 flex flex-col">
        <AddInspectionDialog
          trigger={
            <Button
              className="w-1/3 ml-4 mb-4 p-8 text-white rounded bg-blue-800 hover:bg-gray-700"
              disabled={selectedIds.length > 0}
            >
              <FontAwesomeIcon
                icon={faChartSimple}
                size="1x"
                className="text-black-500"
              />{" "}
              Show Metrics
            </Button>
          }
          title={"Are you absolutely sure?"}
          content={
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          }
          handleAction={handleAddInspection}
          type="metrics"
          setGrade={setGrade}
          setCriticalFlag={setCriticalFlag}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default RestaurantInfoActions;
