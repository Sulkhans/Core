import { Link } from "react-router-dom";
import { BASE_URL } from "../redux/constants";
import { ProductBaseType } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/slices/favoriteSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import Cart from "../assets/cart.svg?react";
import Heart from "../assets/heart.svg?react";

type Props = {
  product: ProductBaseType;
};

const ProductCard = ({ product }: Props) => {
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const isFavorite = favorites.some((item) => item._id === product._id);
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorite
      ? dispatch(removeFromFavorites(product._id!))
      : dispatch(addToFavorites(product));
  };

  const inCart = cartItems.some((item) => item._id === product._id);
  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <Link
      to={`/product/${product._id}`}
      className="min-w-40 max-w-40 sm:min-w-44 sm:max-w-44"
    >
      <div className="size-32 sm:size-40 content-center ml-4 mb-2">
        <img
          src={BASE_URL + product.images[0]}
          draggable={false}
          className="max-w-32 max-h-32 sm:max-h-40 sm:max-w-40"
        />
      </div>
      <p className="font-semibold font-sintony text-lg text-core-main">
        <span className="mr-0.5">$</span>
        {product.price}
      </p>
      <p className="text-sm truncate font-medium mt-0.5">{product.name}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={handleFavorite}>
          <Heart
            className={`${isFavorite && "fill-core-main"} stroke-core-main`}
          />
        </button>
        <button
          onClick={handleCart}
          className="w-full text-nowrap p-2 rounded-full text-sm text-white bg-core-main hover:bg-core-dark active:bg-core-dark transition-colors duration-300"
        >
          <span className="inline-block mb-0.5">Add to cart</span>
          <Cart className="inline ml-2 mb-0.5 size-5" />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
