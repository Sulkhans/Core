import { Fragment, useState } from "react";
import {
  useCreateProductMutation,
  useUploadImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { defaultDetails } from "../../constants/defaults";
import { BASE_URL } from "../../redux/constants";
import {
  PhoneType,
  TabType,
  LaptopType,
  ProductBaseType,
  ErrorType,
  MonitorType,
  TvType,
  ConsoleType,
  HeadphonesType,
} from "../../types/types";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Button from "../../components/Button";

const NewProduct = () => {
  const [uploadImage] = useUploadImageMutation();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [base, setBase] = useState<ProductBaseType | null>({
    name: "",
    image: "",
    brand: "",
    price: 0,
    inStock: 1,
    category: "",
  });
  const [details, setDetails] = useState<
    | PhoneType
    | TabType
    | LaptopType
    | MonitorType
    | TvType
    | ConsoleType
    | HeadphonesType
  >(defaultDetails["phones"]);

  const { data: categories } = useGetCategoriesQuery({});

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
      formData.append("image", e.target.files[0]);
      try {
        const res = await uploadImage(formData).unwrap();
        setBase((prev) => ({ ...prev!, image: res.image }));
        toast.success(res.message);
      } catch (error) {
        toast.error((error as ErrorType)?.data?.message || "Error");
      }
    }
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setBase((prev) => ({ ...prev!, category }));
    setDetails(defaultDetails[category as keyof typeof defaultDetails]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...base, details };
      const res = await createProduct(data).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error((error as ErrorType)?.data?.message || "Error");
    }
  };

  const format = (text: string) =>
    text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w)/, (char) => char.toUpperCase());

  return (
    <form onSubmit={handleSubmit}>
      {base && (
        <div className="flex items-center justify-center w-[30rem] min-w-[30rem] aspect-square p-10 rounded-md border-2 border-core-main">
          {base.image ? (
            <div className="flex flex-col items-center gap-8">
              <img src={BASE_URL + base.image} className="max-h-[20rem]" />
              <Button
                value="Change Image"
                onClick={() => setBase((prev) => ({ ...prev!, image: "" }))}
                className="px-6"
              />
            </div>
          ) : (
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              className="w-60 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:text-core-white file:bg-core-main hover:file:bg-core-dark file:transition-colors"
            />
          )}
        </div>
      )}
      <div className="flex flex-col w-full gap-1 mt-4">
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
            <label className="text-core-main font-medium">Category</label>
            {categories && (
              <select
                onChange={(e) => handleCategory(e)}
                className="rounded-md px-4 py-2 bg-core-white mb-4 outline-none"
              >
                {categories.map((category: any) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
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
      <Button value="Create" disabled={isLoading} className="px-10 mt-4 mb-8" />
    </form>
  );
};

export default NewProduct;
