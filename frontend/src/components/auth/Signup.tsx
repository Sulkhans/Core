import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {}
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
      <button className="bg-core-main hover:bg-core-dark active:bg-core-dark py-2 rounded-md text-white transition-colors">
        Sign up
      </button>
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
