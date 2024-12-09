import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/api/productApiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../../types/types";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Reload from "../../assets/reload.svg?react";
import New from "../../assets/plus.svg?react";
import Trash from "../../assets/trash.svg?react";
import Edit from "../../assets/edit.svg?react";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  inStock: number;
  category: {
    _id: string;
    name: string;
  };
};

const Products = () => {
  const navigate = useNavigate();
  const {
    data: products,
    refetch,
    isLoading,
    error,
  } = useGetAllProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load products");
    }
  }, [error]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete selected category?")) {
      try {
        const res = await deleteProduct(id).unwrap();
        toast.success(res.message);
      } catch (error) {
        toast.error((error as ErrorType)?.data?.message);
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    !error && (
      <>
        <div className="flex gap-4 mb-4">
          <button
            onClick={refetch}
            className="p-2.5 rounded-md bg-core-main hover:bg-core-dark active:bg-core-dark transition-colors"
          >
            <Reload className="size-5 stroke-white" />
          </button>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="p-2 rounded-md bg-core-main hover:bg-core-dark active:bg-core-dark transition-colors"
          >
            <New className="size-6 stroke-white" />
          </button>
        </div>
        <table className="w-full rounded-md overflow-hidden">
          <thead>
            <tr className="*:py-4 *:px-6 bg-core-main text-white *:font-medium *:text-start">
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>inStock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductType) => (
              <tr
                key={product._id}
                className="*:py-4 *:px-6 text-sm text-nowrap group even:bg-core-white hover:bg-core-main hover:bg-opacity-10 transition-all"
              >
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category.name}</td>
                <td>{product.inStock}</td>
                <td className="!p-0 min-w-24 w-24">
                  <div className="flex justify-center gap-2">
                    <Edit
                      onClick={() =>
                        navigate(
                          `/admin/products/${product.category.name}/${product._id}`
                        )
                      }
                      className="size-5 stroke-slate-400 hover:stroke-core-main cursor-pointer transition-colors"
                    />
                    <Trash
                      onClick={() => handleDelete(product._id)}
                      className="size-5 stroke-slate-400 hover:stroke-red-600 cursor-pointer transition-colors"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
};

export default Products;
