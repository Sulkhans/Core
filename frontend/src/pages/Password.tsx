import { useState } from "react";
import { useChangePasswordMutation } from "../redux/api/usersApiSlice";
import { ErrorType } from "../types/types";
import Button from "../components/Button";
import Input from "../components/Input";

const Password = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, { isLoading, isError, error, isSuccess }] =
    useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = form;
    if (
      currentPassword.trim() &&
      newPassword.trim() &&
      confirmPassword.trim()
    ) {
      try {
        await changePassword({
          currentPassword,
          newPassword,
          confirmPassword,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 max-w-[30rem]">
      <label className="text-core-main font-medium">Current Password</label>
      <Input
        type="password"
        name="currentPassword"
        value={form.currentPassword}
        onChange={handleChange}
        className="mb-4 py-3.5 px-4 focus:ring focus:ring-core-main transition-all"
      />
      <label className="text-core-main font-medium">New Password</label>
      <Input
        type="password"
        name="newPassword"
        value={form.newPassword}
        onChange={handleChange}
        className="mb-4 py-3.5 px-4 focus:ring focus:ring-core-main transition-all"
      />
      <label className="text-core-main font-medium">Confirm New Password</label>
      <Input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
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
          Password has been changed successfully
        </span>
      )}
      <Button
        disabled={isLoading}
        value="Change Password"
        className="py-3.5 mt-4"
      />
    </form>
  );
};

export default Password;
