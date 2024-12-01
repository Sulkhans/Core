import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserAdminMutation,
} from "../redux/api/usersApiSlice";
import Loader from "../components/Loader";
import Trash from "../assets/trash.svg?react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorType } from "../types/types";

type UserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const Users = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserAdmin] = useUpdateUserAdminMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete selected user?")) {
      try {
        const res = await deleteUser(id).unwrap();
        toast.success(res.message, {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        });
      } catch (error) {
        toast.error((error as ErrorType)?.data?.message, {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        });
      }
    }
  };

  const handleAdminUpdate = async (id: string) => {
    if (window.confirm("Update selected user?")) {
      try {
        const res = await updateUserAdmin(id).unwrap();
        toast.success(res.message, {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        });
      } catch (error) {
        toast.error((error as ErrorType)?.data?.message, {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        });
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <table className="w-full rounded-md overflow-hidden">
            <thead>
              <tr className="*:py-4 *:px-6 bg-core-main text-white *:font-medium *:text-start">
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th className="!px-0 !text-center">Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserType) => (
                <tr
                  key={user._id}
                  className="*:py-4 *:px-6 text-sm text-nowrap even:bg-core-white hover:bg-core-main hover:bg-opacity-10 transition-all"
                >
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={user.isAdmin}
                      onChange={() => handleAdminUpdate(user._id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td
                    onClick={() => handleDelete(user._id)}
                    className="group cursor-pointer"
                  >
                    <Trash className="size-5 mx-auto stroke-slate-400 group-hover:stroke-red-600 transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer theme="colored" />
        </div>
      )}
    </div>
  );
};

export default Users;
