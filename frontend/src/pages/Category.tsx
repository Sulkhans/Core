import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import { ProductBaseType } from "../types/types";
import Arrow from "../assets/chevron.svg?react";
import Params from "../assets/params.svg?react";

const Category = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSort, setShowSort] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isFilterVisible, setIsFilterVisible] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobileView(true);
        setIsFilterVisible(false);
      } else {
        setIsMobileView(false);
        setIsFilterVisible(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data } = useGetProductsQuery({
    category: category!,
    params: searchParams.toString(),
  });

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    setSearchParams(params.toString());
    setShowSort(false);
  };

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params.toString());
    window.scrollTo(0, 0);
  };

  return (
    <main className="flex flex-col md:flex-row gap-8 mb-4">
      {isFilterVisible && (
        <Filter
          category={category!}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
      <div className="w-full flex flex-col font-medium text-sm">
        <div
          className={`flex ${isMobileView ? "justify-between" : "justify-end"}`}
        >
          {isMobileView && (
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="flex justify-between items-center bg-core-main rounded-full text-white py-2 px-4 gap-2 cursor-pointer"
            >
              <p>Filter</p>
              <Params className="size-4" />
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex justify-between items-center bg-core-main rounded-full text-white py-2 pl-4 pr-3 gap-2 cursor-pointer"
            >
              <p>Sort</p>
              <Arrow
                className={`${
                  showSort && "rotate-180"
                } transition-transform size-5`}
              />
            </button>
            <div
              className={`absolute top-11 right-0 w-40 bg-core-white rounded-md shadow-md overflow-hidden *:w-full *:py-3 *:px-4 hover:*:bg-gray-200 *:duration-300 *:transition-colors ${
                !showSort && "invisible pointer-events-none"
              }`}
            >
              <button onClick={() => handleSort("asc")}>
                Price: Low to high
              </button>
              <button onClick={() => handleSort("desc")}>
                Price: High to low
              </button>
            </div>
          </div>
        </div>
        {data && (
          <>
            <section className="w-full my-6 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
              {data.products.length ? (
                data.products.map((product: ProductBaseType) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <h1>No products found</h1>
              )}
            </section>
            {data.totalPages > 1 && (
              <div className="mx-auto my-4 flex items-center gap-4">
                {new Array(data.totalPages).fill(null).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePage(i + 1)}
                    className={`${
                      searchParams.get("page") === String(i + 1)
                        ? "bg-core-main text-white"
                        : "bg-core-white hover:bg-gray-200 duration-300 transition-colors"
                    } size-8 rounded-full`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Category;
