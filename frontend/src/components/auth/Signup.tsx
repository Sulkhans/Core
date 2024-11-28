import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useSignupMutation } from "../../redux/api/usersApiSlice";
import { setUser } from "../../redux/slices/userSlice";
import { ErrorType } from "../../types/types";
import Input from "../Input";
import Button from "../Button";

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
    confirmPassword: "",
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
        email: form.email.trim().toLocaleLowerCase(),
        password: form.password.trim(),
        confirmPassword: form.confirmPassword.trim(),
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
        <Input
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={handleChange}
        />
        <Input
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>
      <Input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <Button value="Sign up" disabled={isLoading} />
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
