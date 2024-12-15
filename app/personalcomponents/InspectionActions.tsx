import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "~/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import AddInspectionDialog from "./AddInspectionsDialog";

const InspectionActions = ({
  selectedIds,
  setFormData,
  setIsNewItemAdded,
  handleDelete,
}) => {
  const handleAddInspection = () => {
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
  };

  return (
    <div className="w-2/6 flex flex-col">
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
        handleAction={handleDelete}
        type="delete"
      />
    </div>
  );
};

export default InspectionActions;
