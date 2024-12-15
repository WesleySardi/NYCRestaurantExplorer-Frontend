import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Combobox } from "~/components/ui/combobox";
import { DatePicker } from "~/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const AddInspectionDialog = ({
  trigger = null,
  title = null,
  content = null,
  type = null,
  handleAction,
  setGrade = null,
  setCriticalFlag = null,
}) => {
  const handleChangeComboBox = (name: string, value: string, index: number) => {
    if (name === "grade") return setGrade(value);
    if (name === "criticalFlag") return setCriticalFlag(value);
  };

  return (
    <>
      {type === "delete" ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{content}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAction}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : type === "add" ? (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
              <Card>
                <CardHeader>
                  <CardTitle>Create inpection</CardTitle>
                  <CardDescription>
                    Please, type the data to proceed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label htmlFor={`grade`} className="block text-white mb-2">
                      Grade:
                    </label>
                    <Select
                      onValueChange={(value) => {
                        console.log("Grade Selected:", value);
                        setGrade(value);
                      }}
                    >
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem className="cursor-pointer" value="N">
                          N
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="A">
                          A
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="B">
                          B
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="C">
                          C
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Z">
                          Z
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="P">
                          P
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`criticalFlag`}
                      className="block text-white mb-2"
                    >
                      Critical Flag:
                    </label>
                    <Select
                      onValueChange={(value) => {
                        console.log("Grade Selected:", value);
                        setCriticalFlag(value);
                      }}
                    >
                      <SelectTrigger id="criticalFlag">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem className="cursor-pointer" value="Critical">
                          Critical
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value="Not Critical"
                        >
                          Not Critical
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value="Not Applicable"
                        >
                          Not Applicable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`inspectionDate`}
                      className="block text-white mb-2"
                    >
                      Inspection Date:
                    </label>
                    <DatePicker
                      date={new Date().toISOString()}
                      setDate
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`recordDate`}
                      className="block text-white mb-2"
                    >
                      Record Date:
                    </label>
                    <DatePicker
                      date={new Date().toISOString()}
                      setDate
                      disabled
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AlertDialogCancel className="w-1/2 mr-[1vw]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-1/2 ml-[1vw]"
                    onClick={() => handleAction(grade, criticalFlag)}
                  >
                    Save
                  </AlertDialogAction>
                </CardFooter>
              </Card>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddInspectionDialog;
