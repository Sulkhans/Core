import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useSignupMutation } from "../../redux/api/usersApiSlice";
import { setUser } from "../../redux/slices/userSlice";
import { ErrorType } from "../../types/types";

type Props = {
  toggle: () => void;
  close: () => void;
};

const Signup = ({ toggle, close }: Props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup({
        firstName: form.firstName.toLocaleLowerCase().trim(),
        lastName: form.lastName.toLocaleLowerCase().trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      }).unwrap();
      dispatch(setUser({ ...res }));
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-center">
      <h1>Create a new account</h1>
      <div className="flex gap-4 *:w-1/2">
        <input
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={handleChange}
          className="rounded-md px-4 py-2 bg-core-white"
        />
        <input
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={handleChange}
          className="rounded-md px-4 py-2 bg-core-white"
        />
      </div>
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
        Sign up
      </button>
      {isError && (
        <span className="text-xs text-red-600 font-medium">
          {(error as ErrorType)?.data?.message ||
            "An error occurred. Try again later"}
        </span>
      )}
      <p className="text-sm text-pretty">
        Already have an account?{" "}
        <span
          onClick={toggle}
          className="font-medium text-core-main cursor-pointer"
        >
          Log in
        </span>
      </p>
    </form>
  );
};

export default Signup;
