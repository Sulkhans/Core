import { Navigate, useLocation } from "react-router-dom";
import { useSearchProductsQuery } from "../redux/api/productApiSlice";
import { useState } from "react";
import { ProductBaseType } from "../types/types";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import Loader from "../components/Loader";

const Search = () => {
  const query = new URLSearchParams(useLocation().search).get("q");
  const { data, isLoading } = useSearchProductsQuery(query);
  const [limit, setLimit] = useState(20);

  return query ? (
    isLoading ? (
      <Loader />
    ) : (
      <main>
        <h1 className="font-semibold *:text-core-main">
          {data.count} Products found for <span>{query}</span>
        </h1>
        <div className="my-6 grid grid-cols-2 min-[560px]:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
          {data.products.slice(0, limit).map((product: ProductBaseType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {limit < data.count && (
          <Button
            value="Load More"
            onClick={() => setLimit(limit + 20)}
            className="block mx-auto mt-16 mb-8 px-4 text-sm"
          />
        )}
      </main>
    )
  ) : (
    <Navigate to="/" replace />
  );
};

export default Search;
