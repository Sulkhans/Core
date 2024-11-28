import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useUpdateMutation } from "../redux/api/usersApiSlice";
import { setUser } from "../redux/slices/userSlice";
import { ErrorType } from "../types/types";
import Button from "../components/Button";
import Input from "../components/Input";

const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [form, setForm] = useState({
    email: userInfo!.email,
    firstName: userInfo!.name.split(" ")[0],
    lastName: userInfo!.name.split(" ")[1],
  });
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const [update, { isLoading, isError, error, isSuccess }] =
    useUpdateMutation();

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
      const res = await update({
        firstName: form.firstName.trim().toLocaleLowerCase(),
        lastName: form.lastName.trim().toLocaleLowerCase(),
        email: form.email.trim().toLocaleLowerCase(),
        password,
      }).unwrap();
      dispatch(setUser({ ...res }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 max-w-[30rem]">
      <label className="text-core-main font-medium">Email</label>
      <Input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
        className="mb-4 py-3.5 px-4 focus:ring focus:ring-core-main transition-all"
      />
      <label className="text-core-main font-medium">First name</label>
      <Input
        name="firstName"
        value={form.firstName}
        placeholder="First name"
        onChange={handleChange}
        className="mb-4 py-3.5 px-4 focus:ring focus:ring-core-main transition-all"
      />
      <label className="text-core-main font-medium">Last name</label>
      <Input
        name="lastName"
        value={form.lastName}
        placeholder="Last name"
        onChange={handleChange}
        className="mb-4 py-3.5 px-4 focus:ring focus:ring-core-main transition-all"
      />
      <label className="text-core-main font-medium">Current password</label>
      <Input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 py-3.5 px-4 focus:ring focus:ring-core-main transition-all"
      />
      {isError && (
        <span className="text-xs text-red-600 font-medium">
          {(error as ErrorType)?.data?.message ||
            "An error occurred. Try again later"}
        </span>
      )}
      {isSuccess && (
        <span className="text-xs text-green-600 font-medium">
          Profile has been updated successfully
        </span>
      )}
      <Button disabled={isLoading} value="Update" className="py-3.5 mt-4" />
    </form>
  );
};

export default Profile;
