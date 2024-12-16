import React, { useState } from "react";
import InputField from "./InputField";
import { Combobox } from "../components/ui/combobox";
import { DatePicker } from "../components/ui/datepicker";
import AddInspectionDialog from "./AddInspectionsDialog";

interface FormData {
  name: string;
  cuisineDescription: string;
  street: string;
  borough: string;
  zipcode: string;
  phone: string;
  currentGrade: string | null;
  lastInspectionDate: Date | null;
}

const fields = [
  {
    label: "Name",
    id: "name",
    name: "name",
    placeholder: "Restaurant's name",
  },
  {
    label: "Cuisine Type",
    id: "cuisineDescription",
    name: "cuisineDescription",
    placeholder: "Restaurant's cuisine type",
  },
  {
    label: "Street",
    id: "street",
    name: "street",
    placeholder: "Restaurant's street",
  },
  {
    label: "Borough",
    id: "borough",
    name: "borough",
    placeholder: "Restaurant's borough",
  },
  {
    label: "Zipcode",
    id: "zipcode",
    name: "zipcode",
    placeholder: "Restaurant's zipcode",
  },
  {
    label: "Phone",
    id: "phone",
    name: "phone",
    placeholder: "Restaurant's phone",
  },
];

const RestaurantForm: React.FC = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeComboBox = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      {fields.map((field) => (
        <div className="mb-4" key={field.id}>
          <InputField
            label={field.label}
            id={field.id}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] ?? ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="mb-4">
        <label htmlFor="currentGrade" className="block text-white mb-2">
          Current Grade:
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
          value={formData.currentGrade ?? null}
          onChange={handleChangeComboBox}
          name="currentGrade"
          index={0}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastInspectionDate" className="block text-white mb-2">
          Last Inspection Date:
        </label>
        <DatePicker
          date={formData.lastInspectionDate}
          setDate={(date: Date | null) =>
            setFormData({ ...formData, lastInspectionDate: date })
          }
          disabled
        />
      </div>
    </form>
  );
};

export default RestaurantForm;
