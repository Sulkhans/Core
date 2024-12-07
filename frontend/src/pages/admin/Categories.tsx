import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { ErrorType } from "../../types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import Reload from "../../assets/reload.svg?react";
import New from "../../assets/plus.svg?react";
import Trash from "../../assets/trash.svg?react";
import Edit from "../../assets/edit.svg?react";
import Input from "../../components/Input";
import Button from "../../components/Button";

type CategoryType = {
  _id: string;
  name: string;
};

type FormData = {
  _id: string | null;
  name: string;
};

const Categories = () => {
  const {
    data: categories,
    refetch,
    isLoading,
    error,
  } = useGetCategoriesQuery({});
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load categories", {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        closeButton: false,
      });
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const name = formData!.name.trim().toLocaleLowerCase();
      formData?._id
        ? await updateCategory({ id: formData._id, name }).unwrap()
        : await createCategory(name).unwrap();
      const message = formData?._id
        ? "Category has been updated successfully"
        : "Category has been created successfully";
      toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        closeButton: false,
      });
      setFormData(null);
    } catch (error) {
      toast.error((error as ErrorType)?.data?.message, {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        closeButton: false,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete selected category?")) {
      try {
        const res = await deleteCategory(id).unwrap();
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
      ) : error ? (
        <ToastContainer theme="colored" />
      ) : (
        <>
          <div className="flex gap-4 mb-4 min-w-[564px]">
            <button
              onClick={refetch}
              className="p-2.5 rounded-md bg-core-main hover:bg-core-dark active:bg-core-dark transition-colors"
            >
              <Reload className="size-5 stroke-white" />
            </button>
            <button
              onClick={() => setFormData({ _id: null, name: "" })}
              className="p-2 rounded-md bg-core-main hover:bg-core-dark active:bg-core-dark transition-colors"
            >
              <New className="size-6 stroke-white" />
            </button>
            {formData && (
              <form onSubmit={handleSubmit}>
                <Input
                  value={formData.name}
                  placeholder="Category"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev!, name: e.target.value }))
                  }
                />
                <Button value="Confirm" className="ml-4 px-4" />
                <Button
                  onClick={() => setFormData(null)}
                  value="Cancel"
                  className="ml-4 px-4"
                />
              </form>
            )}
          </div>
          <table className="w-full rounded-md overflow-hidden">
            <thead>
              <tr className="*:py-4 *:px-6 bg-core-main text-white *:font-medium *:text-start">
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: CategoryType) => (
                <tr
                  key={category._id}
                  className="*:py-4 *:px-6 text-sm text-nowrap group even:bg-core-white hover:bg-core-main hover:bg-opacity-10 transition-all"
                >
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td className="!p-0 min-w-24 w-24">
                    <div className="flex justify-center gap-2">
                      <Edit
                        onClick={() =>
                          setFormData({
                            _id: category._id,
                            name: category.name,
                          })
                        }
                        className="size-5 stroke-slate-400 hover:stroke-core-main cursor-pointer transition-colors"
                      />
                      <Trash
                        onClick={() => handleDelete(category._id)}
                        className="size-5 stroke-slate-400 hover:stroke-red-600 cursor-pointer transition-colors"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer theme="colored" />
        </>
      )}
    </div>
  );
};

export default Categories;
