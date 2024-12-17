# Nycrestaurant Remix - Frontend Documentation

## Project Overview
This project is a frontend application built with **Remix.run** and **Shadcn/UI** for the Nycrestaurant application. The application connects to a backend API for restaurant management, providing users with features such as listing restaurants, creating new ones, editing existing entries, and viewing detailed restaurant data along with inspection history.

## Setup Instructions

### Prerequisites
- Node.js version >= 20.0.0
- npm or yarn for package management

### 1. Clone the repository
Clone the repository using the following command:
```bash
git clone https://github.com/WesleySardi/NYCRestaurantExplorer-Frontend.git
cd nycrestaurantexplorer-frontend
```

### 2. Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

or, if you're using yarn:
```bash
yarn install
```

### 3. Environment Setup
Ensure you have a `urls` file in the root directory with the necessary configuration for your backend API and other environment settings.

```env
DATABASE_URL=your-database-url
API_BASE_URL=your-api-base-url
```

### 4. Running the Development Server
To start the application in development mode, run:
```bash
npm run dev
```

or with yarn:
```bash
yarn dev
```

This will start the development server at `http://localhost:5173`.

### 5. Building for Production
To build the application for production, run:
```bash
npm run build
```

or with yarn:
```bash
yarn build
```

After building, you can start the production server using:
```bash
npm run start
```

or with yarn:
```bash
yarn start
```

## API Documentation

### Required API Operations

### 1. **Get Restaurants by Filters**
   - **URL:** `/api/restaurants`
   - **Method:** `GET`
   - **Description:** Retrieves restaurants based on filters such as cuisine type, inspection grade, and borough.
   - **Parameters:**
     - `grade` (optional): Cuisine type (e.g., "Italian")
     - `borough` (optional): The borough where the restaurant is located (e.g., "Brooklyn")
     - `cuisineDescription` (optional): Cuisine description
     - `page` (optional): Page number (default: 1)
     - `size` (optional): Items per page (default: 20)
     - `sortBy` (optional): Sorting field (e.g., "name", "grade", "inspection_date")
     - `sortDirection` (optional): Sorting direction (e.g., "asc", "desc")
   
   - **Responses:**
     - `200 OK`: Restaurants retrieved successfully
     - `400 Bad Request`: Invalid parameters

---

### 2. **Search Restaurants by Name**
   - **URL:** `/api/restaurants/search`
   - **Method:** `GET`
   - **Description:** Searches for restaurants by name with pagination support.
   - **Parameters:**
     - `name`: Name of the restaurant (required)
     - `page`: Page number (default: 1)
     - `size`: Items per page (default: 20)
     - `sortBy`: Sorting field (default: "name")
     - `sortDirection`: Sorting direction (default: "asc")
   
   - **Responses:**
     - `200 OK`: Restaurants found successfully
     - `400 Bad Request`: Invalid name parameter

---

### 3. **Get All Restaurants**
   - **URL:** `/api/restaurants/find-all`
   - **Method:** `GET`
   - **Description:** Retrieves all registered restaurants in the system.
   
   - **Responses:**
     - `200 OK`: Restaurants retrieved successfully
     - `500 Internal Server Error`: Error retrieving the restaurants

---

### 4. **Create a Restaurant**
   - **URL:** `/api/restaurants`
   - **Method:** `POST`
   - **Description:** Creates a new restaurant.
   - **Request Body:** 
     - `PostRestaurantCommand` object containing restaurant data (name, cuisine type, borough, grade, etc.)
   
   - **Responses:**
     - `201 Created`: Restaurant created successfully

---

### 5. **Update a Restaurant**
   - **URL:** `/api/restaurants/{id}`
   - **Method:** `PUT`
   - **Description:** Updates information for an existing restaurant.
   - **Parameters:**
     - `id`: ID of the restaurant to be updated
   - **Request Body:** 
     - `PutRestaurantCommand` object containing updated restaurant data
     
   - **Responses:**
     - `200 OK`: Restaurant updated successfully

---

### 6. **Delete a Restaurant**
   - **URL:** `/api/restaurants/{id}`
   - **Method:** `DELETE`
   - **Description:** Deletes a restaurant from the system.
   - **Parameters:**
     - `id`: ID of the restaurant to be deleted
   
   - **Responses:**
     - `204 No Content`: Restaurant deleted successfully

---

### 7. **Get a Restaurant by ID**
   - **URL:** `/api/restaurants/{id}`
   - **Method:** `GET`
   - **Description:** Retrieves a single restaurant by its ID.
   - **Parameters:**
     - `id`: ID of the restaurant to be retrieved
   
   - **Responses:**
     - `200 OK`: Restaurant retrieved successfully

---

### 8. **Delete an Inspection**
   - **URL:** `/api/inspections/{id}`
   - **Method:** `DELETE`
   - **Description:** Deletes an inspection from the system.
   - **Parameters:**
     - `id`: ID of the inspection to be deleted
   
   - **Responses:**
     - `204 No Content`: Inspection deleted successfully

---

## Frontend Requirements

### Technologies
- **Remix.run** for server-side rendering and routing
- **Shadcn/UI** for UI components (data tables, forms, modals, etc.)

### Key Features

1. **Root Component**: Fixes the Sidebar and Background, applying a standardized layout across the application.
2. **Home Page**: Contains a central "Explore Restaurants" button, which leads to the list of restaurants.
![image](https://github.com/user-attachments/assets/79957449-116a-4735-8cdd-5a4195ec9718)

4. **Restaurant List**: Displays a table of restaurants with pagination and search functionality. It also includes buttons for editing, viewing, and creating new restaurants.
![image](https://github.com/user-attachments/assets/142d3e03-b985-4a33-a928-61f6fbeb4b86)

6. **Create New Restaurant**: A form that allows users to create a new restaurant entry.
![image](https://github.com/user-attachments/assets/db6b5acf-dad1-4cc5-8533-668ec314cad4)

8. **View Restaurant**: Displays detailed information for a selected restaurant, including its inspection history, ratings, and charts showing inspection grades and critical flags.
![image](https://github.com/user-attachments/assets/91a9ce10-21fc-4916-9f63-e117c786d4a8)
![image](https://github.com/user-attachments/assets/4742b72d-0c12-4e9b-af5b-6e653d19f163)

10. **Edit Restaurant**: A form where users can edit restaurant details and delete the entry, with some fields being locked for editing.
![image](https://github.com/user-attachments/assets/83ac54f5-6ad8-4e3c-9967-08705ce7eced)

12. **Confirmation Modals**: Used for all creation, update, and deletion operations to confirm the user's action.
![image](https://github.com/user-attachments/assets/585ba3dd-025d-4c33-a3ef-883dbacac0ca)

### Shadcn/UI Components Usage
- **Data Tables**: Used for displaying the restaurant list with pagination and sorting options.
- **Forms**: Shadcn/UI forms are used for creating and editing restaurant data.
- **Search Inputs & Filters**: For filtering restaurants based on various criteria.
- **Modals**: Confirmation modals for confirming user actions such as deletion and creation of restaurant entries.
- **Navigation**: Sidebar navigation is fixed for the entire application.

### Components
- **Table**: Displays restaurant data such as name, address, cuisine, and phone number.
- **Buttons**: Includes buttons for viewing, editing, and creating new restaurants.
- **Forms**: Used in the Create and Edit Restaurant screens.
- **Modals**: Confirmation modals for each action.

## File Structure

```
│   db.ts
│   entry.client.tsx
│   entry.server.tsx
│   layout.tsx
│   root.tsx
│   tailwind.css
│
├───api
│   └───fillDatabase
│           loadData.js
│
├───components
│   └───ui
│           alert-dialog.tsx
│           app-sidebar.tsx
│           button.tsx
│           calendar.tsx
│           card.tsx
│           carousel.tsx
│           chart.tsx
│           combobox.tsx
│           comboboxsearch.tsx
│           command.tsx
│           datepicker.tsx
│           dialog.tsx
│           form.tsx
│           input.tsx
│           label.tsx
│           pagination.tsx
│           popover.tsx
│           select.tsx
│           separator.tsx
│           sheet.tsx
│           sidebar.tsx
│           skeleton.tsx
│           table.tsx
│           toastcontainer.tsx
│           tooltip.tsx
│
├───hooks
│       use-mobile.tsx
│       use-toast.tsx
│
├───interfaces
│       AddInspectionDialogInterface.tsx
│       ComboboxPropsInterface.tsx
│       FormDataCreateInterface.tsx
│       FormDataInterface.tsx
│       IconButtonInterface.tsx
│       InputFieldPropsInterface.tsx
│       InputFieldsInterface.tsx
│       InspectionActionsPropsInterface.tsx
│       InspectionListPropsInterface.tsx
│       PaginationPropsInterface.tsx
│       RestaurantTableProps.tsx
│       SearchBarInterface.tsx
│
├───lib
│       utils.ts
│
├───personalcomponents
│       AddInspectionsDialog.tsx
│       IconButton.tsx
│       InputField.tsx
│       InspectionActions.tsx
│       InspectionList.tsx
│       RestaurantFormCreate.tsx
│       RestaurantInfoActions.tsx
│       RestaurantTable.tsx
│       RestaurantTablePagination.tsx
│       SearchBar.tsx
│
├───routes
│       restaurants.tsx
│       restaurantsFormCreate.tsx
│       restaurantsFormInfo.$id.tsx
│       restaurantsFormUpdate.$id.tsx
│       _index.tsx
│
└───styles
        global.css
```
