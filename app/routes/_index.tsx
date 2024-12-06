import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  const handlePageChange = () => {
    navigate(`/restaurants`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">NYC Restaurant Explorer</h1>
        <Button
          variant="default"
          onClick={() => handlePageChange()}
          className="px-6 py-3 text-lg"
        >
          Explore restaurants
        </Button>
      </div>
    </div>
  );
}
