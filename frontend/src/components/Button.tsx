type Props = {
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  value,
  onClick,
  disabled = false,
  className = "",
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        disabled ? "bg-core-dark !bg-opacity-70" : "bg-core-main"
      } py-2 rounded-md hover:bg-core-dark active:bg-core-dark text-white transition-all`}
    >
      {value}
    </button>
  );
};

export default Button;
