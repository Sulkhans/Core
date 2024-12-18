import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useGetProductByIdQuery } from "../redux/api/productApiSlice";
import { BASE_URL } from "../redux/constants";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/slices/favoriteSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";
import Cart from "../assets/cart.svg?react";
import Heart from "../assets/heart.svg?react";

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const isFavorite = favorites.some((item) => item._id === id);
  const handleFavorite = () =>
    isFavorite
      ? dispatch(removeFromFavorites(product._id!))
      : dispatch(addToFavorites(product));

  const inCart = cartItems.some((item) => item._id === id);
  const handleCart = () => {
    if (!inCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success("Product was added to the cart");
    } else {
      const toastId = "product-in-cart-toast";
      if (!toast.isActive(toastId)) {
        toast.success("Product is already in the cart", { toastId });
      }
    }
  };

  const swiperRef = useRef<SwiperRef>(null);
  const handleSlideTo = (i: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(i);
    }
  };

  const format = (str: string) =>
    str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w)/, (char) => char.toUpperCase())
      .replace(/\b\w{1,3}\b/g, (word) => word.toUpperCase());

  return isLoading ? (
    <Loader />
  ) : (
    <main className="grid lg:grid-cols-2 lg:gap-4 xl:gap-8">
      <section>
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-0">
          <div className="flex justify-center gap-4 lg:flex-col">
            {product.images.map((img: string, i: number) => (
              <img
                key={i}
                src={BASE_URL + img}
                draggable={false}
                onClick={() => handleSlideTo(i)}
                className="w-20 aspect-square p-2 rounded-md border-2 border-[#f1f5f9] select-none cursor-pointer"
              />
            ))}
          </div>
          <Swiper
            ref={swiperRef}
            navigation={true}
            modules={[Navigation]}
            className="w-full max-w-xs sm:max-w-sm xl:max-w-md relative"
          >
            {product.images.map((img: string) => (
              <SwiperSlide key={img}>
                <img
                  src={BASE_URL + img}
                  draggable={false}
                  className="p-8 lg:p-12 aspect-square select-none"
                />
              </SwiperSlide>
            ))}
            <button
              onClick={handleFavorite}
              className="absolute right-0 bottom-0 lg:top-4 lg:bottom-auto lg:right-4 z-10"
            >
              <Heart
                className={`${isFavorite && "fill-core-main"} stroke-core-main`}
              />
            </button>
          </Swiper>
        </div>
        <div className="flex justify-center my-6 lg:my-5 lg:ml-20">
          <button
            onClick={handleCart}
            className="w-full lg:max-w-sm xl:max-w-md text-nowrap py-2 px-6 rounded-md text-white bg-core-main hover:bg-core-dark active:bg-core-dark duration-300 transition-colors"
          >
            <span className="inline-block">Add to cart</span>
            <Cart className="inline ml-2 mb-0.5" />
          </button>
        </div>
      </section>
      <section>
        <h1 className="font-medium text-balance text-3xl">
          {product.brand !== product.name.split(" ")[0] && product.brand}{" "}
          {product.name}
        </h1>
        <p className="font-semibold font-sintony text-2xl mt-2">
          <span className="mr-0.5">$</span>
          {product.price}
        </p>
        <h2 className="mt-4 mb-2 text-lg font-semibold font-sintony text-core-main">
          Specifications
        </h2>
        <div className="max-h-[24rem] overflow-y-auto scroll pr-2">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.details).map(([key, value]) =>
                value ? (
                  <tr key={key} className="*:px-4 *:py-3.5 even:bg-core-white">
                    <td className="rounded-l-md">{format(key)}</td>
                    <td className="rounded-r-md">
                      {typeof value === "boolean"
                        ? value
                          ? "Yes"
                          : "No"
                        : String(value)}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Product;
