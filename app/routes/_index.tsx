import { Outlet, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Index() {
  const navigate = useNavigate();

  const handlePageChange = () => {
    navigate(`/restaurants`);
  };

  return (
    <div className="flex items-center h-full text-center">
      <div>
        <h1 className="text-5xl font-bold mb-4 text-white">
          NYC Restaurant Explorer
        </h1>
        <Button
          variant="outline"
          onClick={() => handlePageChange()}
          className="px-7 py-5 text-lg text-2xl"
        >
          Explore
        </Button>
      </div>
    </div>
  );
}
