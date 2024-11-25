import { useState } from "react";

type Props = {
  toggle: () => void;
  close: () => void;
};

const Login = ({ toggle, close }: Props) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-4 text-center">
      <h1>Log in to your account</h1>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="rounded-md px-4 py-2 bg-core-white"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="rounded-md px-4 py-2 bg-core-white"
      />
      <button
        className={`bg-core-main hover:bg-core-dark active:bg-core-dark py-2 rounded-md text-white transition-colors`}
      >
        Log in
      </button>
      <p className="text-sm text-pretty">
        Don't have an account?{" "}
        <span
          onClick={toggle}
          className="font-medium text-core-main cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </form>
  );
};

export default Login;
