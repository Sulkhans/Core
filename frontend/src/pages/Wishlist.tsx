import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearFavorites } from "../redux/slices/favoriteSlice";
import Heart from "../assets/heart.svg?react";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch<AppDispatch>();

  return favorites.length > 0 ? (
    <main>
      <div className="mb-4 flex justify-between items-center text-core-main font-semibold">
        <h1>Wishlist</h1>
        <button onClick={() => dispatch(clearFavorites())}>
          Clear wishlist
        </button>
      </div>
      <section className="my-6 grid grid-cols-2 min-[560px]:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </main>
  ) : (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap flex flex-col items-center text-xl font-semibold text-core-main">
      <Heart className="size-14 mb-2 stroke-[1.75px]" />
      <p>Your Wishlist Is Empty</p>
      <p>Find Something You Love</p>
    </div>
  );
};

export default Wishlist;
