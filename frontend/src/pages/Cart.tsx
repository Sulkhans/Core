import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { BASE_URL } from "../redux/constants";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../redux/slices/cartSlice";
import Button from "../components/Button";
import Icon from "../assets/cart.svg?react";

type ContextType = {
  openAuthModal: () => void;
};

const Cart = () => {
  const { openAuthModal } = useOutletContext<ContextType>();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleItem = (e: React.MouseEvent, id: string, quantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    quantity === 0
      ? dispatch(removeFromCart(id))
      : dispatch(updateQuantity({ id, quantity }));
  };

  const handleUser = () => (userInfo ? navigate("/shipping") : openAuthModal());

  return cartItems.length > 0 ? (
    <main>
      <div className="flex justify-between items-center mb-3 md:mx-2 font-semibold text-core-main">
        <h1 className="text-lg">Shopping Cart</h1>
        <button onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
      <div className="grid md:grid-cols-[1fr_360px] gap-4 md:gap-6">
        <section className="space-y-4">
          {cartItems.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item._id}`}
              className="flex items-center p-3 gap-4 rounded-2xl bg-core-white text-core-main"
            >
              <img
                src={BASE_URL + item.images[0]}
                className="size-[4.5rem] bg-white p-1.5 rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-pretty line-clamp-2">
                  {item.name}
                </h2>
                <p className="font-semibold font-sintony *:mr-0.5">
                  <span>$</span>
                  {item.price}
                </p>
              </div>
              <div className="flex py-1 ml-auto mr-4 rounded-full bg-core-main text-white *:px-4">
                <button
                  onClick={(e) => handleItem(e, item._id!, item.quantity - 1)}
                >
                  -
                </button>
                <p className="w-4 text-center cursor-default !p-0">
                  {item.quantity}
                </p>
                <button
                  onClick={(e) => handleItem(e, item._id!, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </Link>
          ))}
        </section>
        <section>
          <div className="h-24 px-6 rounded-2xl bg-core-white content-center">
            <table className="w-full mx-auto font-semibold text-core-main border-separate border-spacing-y-2">
              <tbody>
                <tr>
                  <td>Total Items</td>
                  <td className="font-sintony">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </td>
                </tr>
                <tr>
                  <td>Total Price</td>
                  <td className="font-sintony">
                    <span className="mr-0.5">$</span>
                    {cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button
            value="Proceed to Checkout"
            onClick={handleUser}
            className="mt-4 !rounded-full w-full"
          />
        </section>
      </div>
    </main>
  ) : (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap flex flex-col items-center text-xl font-semibold text-core-main">
      <Icon className="size-14 mb-2 stroke-[1.75px]" />
      <p>Your Cart Is Empty</p>
      <p>Find Something You Want</p>
    </div>
  );
};

export default Cart;
