import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconButtonProps {
  icon: any;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`h-1/2 hover:bg-gray-700 text-white ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} size="2x" className="text-black-500" />
    </button>
  );
};

export default IconButton;
