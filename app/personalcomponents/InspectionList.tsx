import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Combobox } from "~/components/ui/combobox";
import { DatePicker } from "~/components/ui/datepicker";
import { Button } from "~/components/ui/button";
import { IInspection } from "~/interfaces/FormDataInterface";

const InspectionsList = ({
  inspections,
  selectedIds,
  newItemRef,
  handleCardClick,
  handleChangeComboBox,
  handleDatePickerChange,
  isEditable = true,
}: IInspectionsListProps) => {
  return (
    <div className="w-1/2">
      {inspections.map((inspection: IInspection, index: number) => (
        <div
          key={index}
          className={`rounded mb-3 p-4 ${
            selectedIds.includes(index) ? "bg-red-900" : ""
          }`}
          ref={index === inspections.length - 1 ? newItemRef : null}
        >
          <div className="flex justify-between text-white mb-2 border-b pb-3 font-bold">
            <h1>Inspection {index + 1}</h1>
            {isEditable ? (
              <Button
                className={`cursor-pointer px-5 ${
                  selectedIds.includes(index) ? "bg-black" : "bg-[#820202]"
                } ${
                  selectedIds.includes(index)
                    ? "hover:bg-gray-700"
                    : "hover:bg-black"
                }`}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleCardClick(e, index)
                }
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  size="1x"
                  className="text-black-500"
                />
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor={`grade-${index}`} className="block text-white mb-2">
              Grade:
            </label>
            <Combobox
              frameworks={[
                { value: "N", label: "N" },
                { value: "A", label: "A" },
                { value: "B", label: "B" },
                { value: "C", label: "C" },
                { value: "Z", label: "Z" },
                { value: "P", label: "P" },
              ]}
              value={inspection.grade ?? null}
              onChange={handleChangeComboBox}
              name="grade"
              index={index}
              disabled={!isEditable}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`criticalFlag-${index}`}
              className="block text-white mb-2"
            >
              Critical Flag:
            </label>
            <Combobox
              frameworks={[
                { value: "Critical", label: "Critical" },
                { value: "Not Critical", label: "Not Critical" },
                { value: "Not Applicable", label: "Not Applicable" },
              ]}
              value={inspection.criticalFlag ?? null}
              onChange={handleChangeComboBox}
              name="criticalFlag"
              index={index}
              disabled={!isEditable}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`inspectionDate-${index}`}
              className="block text-white mb-2"
            >
              Inspection Date:
            </label>
            <DatePicker
              date={inspection.inspectionDate ?? new Date().toISOString()}
              setDate={(value: string) =>
                handleDatePickerChange(value, index, "inspectionDate")
              }
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`recordDate-${index}`}
              className="block text-white mb-2"
            >
              Record Date:
            </label>
            <DatePicker
              date={inspection.recordDate ?? new Date().toISOString()}
              setDate={(value: string) =>
                handleDatePickerChange(value, index, "recordDate")
              }
              disabled
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InspectionsList;
