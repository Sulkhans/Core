import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import {
  useDeleteImageMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../redux/api/productApiSlice";
import { BASE_URL } from "../../redux/constants";
import {
  PhoneType,
  LaptopType,
  ProductBaseType,
  ErrorType,
} from "../../types/types";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Input from "../../components/Input";
import Button from "../../components/Button";

const EditProduct = () => {
  const { category, id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [base, setBase] = useState<ProductBaseType | null>(null);
  const [details, setDetails] = useState<PhoneType | LaptopType | null>(null);

  useEffect(() => {
    if (product) {
      setBase({
        name: product.name,
        images: product.images,
        brand: product.brand,
        price: product.price,
        inStock: product.inStock,
        category: category!,
      });
      setDetails(product.details);
    }
  }, [isLoading]);

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setBase((prev) => ({
      ...prev!,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDetails((prev) => ({
      ...prev!,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((file) => {
        formData.append("images", file);
      });
      try {
        const res = await uploadImage(formData).unwrap();
        setBase((prev) => ({
          ...prev!,
          images: [...prev!.images, ...res.images],
        }));
        toast.success(res.message);
      } catch (error) {
        toast.error((error as ErrorType)?.data?.message || "Error");
      }
    }
  };

  const handleImageDelete = async (path: string) => {
    if (window.confirm("Delete selected image?")) {
      try {
        const res = await deleteImage(path.split("/")[2]).unwrap();
        const images = base!.images.filter((img) => img !== path);
        setBase((prev) => ({ ...prev!, images }));
        toast.success(res.message);
      } catch (error) {
        toast.error((error as ErrorType)?.data?.message || "Error");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...base, details };
      const res = await updateProduct({ id, data }).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error((error as ErrorType)?.data?.message || "Error");
    }
  };

  const format = (text: string) =>
    text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w)/, (char) => char.toUpperCase());

  return isLoading ? (
    <Loader />
  ) : error ? (
    <p className="text-center text-lg font-semibold text-core-dark">
      {(error as ErrorType)?.data?.message}
    </p>
  ) : (
    <form onSubmit={handleSubmit}>
      <label className="text-core-main font-medium mr-6">Images</label>
      <input
        multiple
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => handleImageUpload(e)}
        className="w-60 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:text-core-white file:bg-core-main hover:file:bg-core-dark file:transition-colors"
      />
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 my-6">
        {base?.images.map((image, i) => (
          <img
            key={i}
            src={BASE_URL + image}
            className="w-[9rem] md:w-[13rem] aspect-square cursor-pointer"
            onClick={() => handleImageDelete(image)}
          />
        ))}
      </div>
      <div className="flex flex-col w-full gap-1">
        {base && (
          <>
            <label className="text-core-main font-medium">Name</label>
            <Input
              name="name"
              value={base.name}
              onChange={(e) => handleBaseChange(e)}
              className="mb-4"
            />
            <label className="text-core-main font-medium">Brand</label>
            <Input
              name="brand"
              value={base.brand}
              onChange={(e) => handleBaseChange(e)}
              className="mb-4"
            />
            <label className="text-core-main font-medium">Price</label>
            <Input
              type="number"
              name="price"
              value={base.price.toString()}
              onChange={(e) => handleBaseChange(e)}
              className="mb-4"
            />
            <label className="text-core-main font-medium">Stock</label>
            <Input
              type="number"
              name="inStock"
              value={base.inStock.toString()}
              onChange={(e) => handleBaseChange(e)}
              className="mb-4"
            />
          </>
        )}
        {details &&
          Object.entries(details).map(([key, value]) => (
            <Fragment key={key}>
              <label className="text-core-main font-medium">
                {format(key)}
              </label>
              {typeof value === "boolean" ? (
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={(e) => handleDetailsChange(e)}
                  className="size-6 mb-4"
                />
              ) : (
                <Input
                  type={typeof value === "string" ? "text" : "number"}
                  name={key}
                  value={value.toString()}
                  onChange={(e) => handleDetailsChange(e)}
                  className="w-full mb-4"
                />
              )}
            </Fragment>
          ))}
      </div>
      <Button value="Update" disabled={updating} className="px-10 mt-4 mb-8" />
    </form>
  );
};

export default EditProduct;
