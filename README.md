
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

#### Create (POST /api/restaurants)
Used to add a new restaurant entry.

#### Read (GET Endpoints)

1. **List Restaurants** - `/api/restaurants`

- **Query Params:**
  - `page` (default: 1)
  - `limit` (default: 20)
  - `cuisine` (filter by cuisine type)
  - `grade` (filter by grade)
  - `borough` (filter by borough)

- **Sort By:** `name`, `grade`, `inspection_date`

2. **Get Single Restaurant** - `/api/restaurants/:id`
   - Retrieves detailed information about a single restaurant, including inspection history.

3. **Search Restaurants** - `/api/restaurants/search`
   - Search by restaurant name (minimum 3 characters required).

#### Update (PUT /api/restaurants/:id)
Used to update restaurant details.

#### Delete (DELETE /api/restaurants/:id)
Used to remove a restaurant entry. It is recommended to soft delete the restaurant and cascade delete related inspection records.

## Frontend Requirements

### Technologies
- **Remix.run** for server-side rendering and routing
- **Shadcn/UI** for UI components (data tables, forms, modals, etc.)

### Key Features
1. **Root Component**: Fixes the Sidebar and Background, applying a standardized layout across the application.
2. **Home Page**: Contains a central "Explore Restaurants" button, which leads to the list of restaurants.
3. **Restaurant List**: Displays a table of restaurants with pagination and search functionality. It also includes buttons for editing, viewing, and creating new restaurants.
4. **Create New Restaurant**: A form that allows users to create a new restaurant entry.
5. **View Restaurant**: Displays detailed information for a selected restaurant, including its inspection history, ratings, and charts showing inspection grades and critical flags.
6. **Edit Restaurant**: A form where users can edit restaurant details and delete the entry, with some fields being locked for editing.
7. **Confirmation Modals**: Used for all creation, update, and deletion operations to confirm the user's action.

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
