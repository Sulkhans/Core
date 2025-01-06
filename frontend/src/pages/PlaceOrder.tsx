import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useCreateOrderMutation } from "../redux/api/orderApiSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { ErrorType } from "../types/types";
import OrderItems from "../components/order/OrderItems";
import ShippingDetails from "../components/order/ShippingDetails";
import OrderSummary from "../components/order/OrderSummary";
import Button from "../components/Button";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, shippingAddress } = useSelector(
    (state: RootState) => state.cart
  );
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleOrder = async () => {
    try {
      const res = await createOrder({
        items: cartItems,
        shippingAddress,
        paymentMethod: "PayPal",
      }).unwrap();
      dispatch(clearCart());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error((error as ErrorType)?.data?.message);
    }
  };

  return (
    <main className="grid md:grid-cols-[1fr_360px] gap-4 md:gap-6">
      <OrderItems items={cartItems} />
      <section className="space-y-3">
        <ShippingDetails shippingAddress={shippingAddress} />
        <OrderSummary items={cartItems} />
        <Button
          value="Place Order"
          disabled={isLoading}
          onClick={handleOrder}
          className="w-full !rounded-full !mt-6"
        />
      </section>
    </main>
  );
};

export default PlaceOrder;
