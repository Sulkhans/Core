type Props = {
  type?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({
  type = "text",
  name = "",
  placeholder = "",
  value,
  className,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-md px-4 py-2 bg-core-white ${className}`}
    />
  );
};

export default Input;
