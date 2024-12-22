import { useGetFilterOptionsQuery } from "../redux/api/productApiSlice";

type Props = {
  category: string;
  searchParams: URLSearchParams;
  setSearchParams: (params: string) => void;
};

const Filter = ({ category, searchParams, setSearchParams }: Props) => {
  const { data } = useGetFilterOptionsQuery(category);

  const handlePrice = (key: "priceMin" | "priceMax", value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    params.set("page", "1");
    setSearchParams(params.toString());
  };

  const isChecked = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);
    if (params.has(key)) {
      const values = params.get(key)!.split(",");
      return values.includes(value.toString());
    }
    return false;
  };

  const handleCheck = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);
    if (params.has(key)) {
      const values = params.get(key)!.split(",");
      values.includes(value.toString())
        ? values.splice(values.indexOf(value.toString()), 1)
        : values.push(value.toString());
      values.length ? params.set(key, values.join(",")) : params.delete(key);
    } else params.set(key, value.toString());
    params.set("page", "1");
    setSearchParams(params.toString());
  };

  const format = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w)/, (char) => char.toUpperCase())
      .replace(/\b\w{1,3}\b/g, (word) => word.toUpperCase());

  if (data) {
    const { price, ...filters } = data;
    return (
      <form className="h-fit min-w-80 lg:max-w-80 px-8 py-6 space-y-6 rounded-2xl bg-core-white text-nowrap select-none transition-all">
        <div>
          <h2 className="font-medium">Price</h2>
          <div className="flex mt-2 text-sm content-center">
            <input
              maxLength={5}
              value={searchParams.get("priceMin") || Math.min(...price)}
              onChange={(e) => handlePrice("priceMin", e.target.value)}
              className="w-1/2 py-1.5 px-2 rounded-md border border-gray-300 bg-white hover:border-core-main hover:bg-indigo-100 duration-300 transition-colors"
            />
            <span className="mx-4 py-1.5">-</span>
            <input
              maxLength={5}
              value={searchParams.get("priceMax") || Math.max(...price)}
              onChange={(e) => handlePrice("priceMax", e.target.value)}
              className="w-1/2 py-1.5 px-2 rounded-md border border-gray-300 bg-white hover:border-core-main hover:bg-indigo-100 duration-300 transition-colors"
            />
          </div>
        </div>
        {Object.entries(filters).map(([key, value]) => (
          <div key={key}>
            <h2 className="font-medium">{format(key)}</h2>
            {(value as (string | boolean)[]).map((val: any, i: number) => (
              <div key={`${key}-${i}`} className="flex mt-2 text-sm">
                <input
                  type="checkbox"
                  id={`${key}-${i}`}
                  checked={isChecked(key, val)}
                  onChange={() => handleCheck(key, val)}
                  className="w-5 h-5 appearance-none cursor-pointer rounded-md border border-gray-300 bg-white hover:border-core-main hover:bg-indigo-100 checked:bg-[url('./assets/check.svg')] checked:bg-no-repeat checked:bg-center checked:border-core-main checked:bg-indigo-100 duration-300 transition-colors"
                />
                <label htmlFor={`${key}-${i}`} className="pl-2 cursor-pointer">
                  {typeof val === "boolean" ? (val ? "Yes" : "No") : val}
                </label>
              </div>
            ))}
          </div>
        ))}
      </form>
    );
  }
};

export default Filter;
