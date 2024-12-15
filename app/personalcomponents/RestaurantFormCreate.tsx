import React, { useState } from "react";
import InputField from "./InputField";
import { Combobox } from "../components/ui/combobox"; // Supondo que o Combobox esteja importado de algum lugar
import { DatePicker } from "../components/ui/datepicker"; // Supondo que o DatePicker esteja importado de algum lugar

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
      <InputField
        label="Name"
        id="name"
        name="name"
        placeholder="Restaurant's name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <InputField
        label="Cuisine Type"
        id="cuisineDescription"
        name="cuisineDescription"
        placeholder="Restaurant's cuisine type"
        value={formData.cuisineDescription}
        onChange={handleChange}
        required
      />
      <InputField
        label="Street"
        id="street"
        name="street"
        placeholder="Restaurant's street"
        value={formData.street}
        onChange={handleChange}
        required
      />
      <InputField
        label="Borough"
        id="borough"
        name="borough"
        placeholder="Restaurant's borough"
        value={formData.borough}
        onChange={handleChange}
        required
      />
      <InputField
        label="Zipcode"
        id="zipcode"
        name="zipcode"
        placeholder="Restaurant's zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        required
      />
      <InputField
        label="Phone"
        id="phone"
        name="phone"
        placeholder="Restaurant's phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
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
