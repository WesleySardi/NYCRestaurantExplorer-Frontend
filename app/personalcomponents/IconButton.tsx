import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IIconButtonProps } from "~/interfaces/IconButtonInterface";

const IconButton = ({
  icon,
  onClick,
  className,
  disabled,
}: IIconButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`h-1/2 hover:bg-gray-700 text-white ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} size="1x" className="text-black-500" />
    </button>
  );
};

export default IconButton;
