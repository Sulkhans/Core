import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import Icon from "../assets/cart.svg?react";
import Cart from "../components/Cart";
import Shipping from "./Shipping";
import PlaceOrder from "./PlaceOrder";

const CartPage = () => {
  const [progress, setProgress] = useState(1);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return cartItems.length > 0 ? (
    progress === 1 ? (
      <Cart next={() => setProgress(2)} />
    ) : progress === 2 ? (
      <Shipping next={() => setProgress(3)} />
    ) : (
      <PlaceOrder />
    )
  ) : (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap flex flex-col items-center text-xl font-semibold text-core-main">
      <Icon className="size-14 mb-2 stroke-[1.75px]" />
      <p>Your Cart Is Empty</p>
      <p>Find Something You Want</p>
    </div>
  );
};

export default CartPage;
