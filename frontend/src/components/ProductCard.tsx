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
    }
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="min-w-40 max-w-40">
        <img
          src={BASE_URL + product.image}
          draggable={false}
          className="size-40"
        />
        <div className="flex justify-between items-center mt-4">
          <p className="font-semibold font-sintony text-lg text-core-dark">
            <span className="mr-0.5">$</span>
            {product.price}
          </p>
          <button onClick={handleFavorite}>
            <Heart
              className={`${isFavorite && "fill-core-dark"} stroke-core-dark`}
            />
          </button>
        </div>
        <p className="text-sm truncate mt-2 pb-3">{product.name}</p>
        <button
          onClick={handleCart}
          className="w-full p-2 rounded-md text-sm text-white bg-core-main hover:bg-core-dark active:bg-core-dark transition-colors"
        >
          <span className="inline-block mb-0.5">
            {inCart ? "Already in cart" : "Add to cart"}
          </span>
          {!inCart && <Cart className="inline ml-2 mb-0.5 size-5" />}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
