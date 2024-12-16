import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "~/components/ui/button";
import AddInspectionDialog from "./AddInspectionsDialog";
import { Dispatch, SetStateAction, useState } from "react";
import { IInspectionActionsProps } from "~/interfaces/InspectionActionsPropsInterface";

const InspectionActions = ({
  selectedIds,
  setFormData,
  setIsNewItemAdded,
  handleDeleteInspection,
  handleDeleteRestaurant,
}: IInspectionActionsProps) => {
  const [grade, setGrade]: [
    string | null,
    Dispatch<SetStateAction<string | null>>
  ] = useState<null | string>("N");
  const [criticalFlag, setCriticalFlag]: [
    string | null,
    Dispatch<SetStateAction<string | null>>
  ] = useState<null | string>("Undefined Critical Flag");

  const handleAddInspection = () => {
    setFormData((prevData: IRestaurant) => ({
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
                icon={faPlus}
                size="1x"
                className="text-black-500"
              />{" "}
              Add Inspections
            </Button>
          }
          title={"Are you absolutely sure?"}
          content={
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          }
          handleAction={handleAddInspection}
          type="add"
          setGrade={setGrade}
          setCriticalFlag={setCriticalFlag}
        />
        <AddInspectionDialog
          trigger={
            <Button
              className="w-1/3 ml-4 p-8 text-white rounded bg-red-800 hover:bg-gray-700"
              disabled={selectedIds.length === 0}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                className="text-black-500"
              />{" "}
              Delete Inspections
            </Button>
          }
          title={"Are you absolutely sure?"}
          content={
            "This action cannot be undone. This will permanently delete the inspection and remove the data from our servers."
          }
          handleAction={handleDeleteInspection}
          type="message"
        />
      </div>
      <div className="mt-auto">
        <AddInspectionDialog
          trigger={
            <Button className="w-1/3 ml-4 p-8 text-white rounded bg-red-800 hover:bg-gray-700">
              <FontAwesomeIcon
                icon={faTrash}
                size="1x"
                className="text-black-500"
              />{" "}
              Delete Restaurant
            </Button>
          }
          title={"Are you absolutely sure?"}
          content={
            "This action cannot be undone. This will permanently delete the restaurant and remove the data from our servers."
          }
          handleAction={handleDeleteRestaurant}
          type="message"
        />
      </div>
    </div>
  );
};

export default InspectionActions;
