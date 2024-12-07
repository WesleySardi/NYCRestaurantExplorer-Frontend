import { Outlet, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  const handlePageChange = () => {
    navigate(`/restaurants`);
  };

  return (
    <div className="flex flex-col min-h-screen h-full">
      <div className="flex items-center justify-center bg-gray-100 p-6 h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">NYC Restaurant Explorer</h1>
          <Button
            variant="default"
            onClick={() => handlePageChange()}
            className="px-6 py-3 text-lg"
          >
            Explore
          </Button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
