import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setUser } from "../../redux/slices/userSlice";
import { ErrorType } from "../../types/types";

type Props = {
  toggle: () => void;
  close: () => void;
};

const Login = ({ toggle, close }: Props) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.password.trim())
      return;
    try {
      const res = await login({
        email: form.email,
        password: form.password,
      }).unwrap();
      dispatch(setUser({ ...res }));
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center">
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
        disabled={isLoading}
        className={`bg-core-main hover:bg-core-dark active:bg-core-dark py-2 rounded-md text-white transition-colors
          ${isLoading && "!bg-core-dark !bg-opacity-70"}`}
      >
        Log in
      </button>
      {isError && (
        <span className="text-xs text-red-600 font-medium">
          {(error as ErrorType)?.data?.message ||
            "An error occurred. Try again later"}
        </span>
      )}
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
