import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../redux/api/orderApiSlice";
import { toast } from "react-toastify";
import { ErrorType } from "../types/types";
import OrderItems from "../components/order/OrderItems";
import OrderSummary from "../components/order/OrderSummary";
import ShippingDetails from "../components/order/ShippingDetails";
import Loader from "../components/Loader";

const OrderContent = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { data: order, refetch, isLoading } = useGetOrderByIdQuery(id);
  const [payOrder, { isLoading: isLoadingPay }] = usePayOrderMutation();
  const [deliverOrder] = useDeliverOrderMutation();

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order!.totalPrice.toFixed(2) },
          },
        ],
      })
      .then((orderId: string) => orderId);
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async (details: any) => {
      try {
        await payOrder({ id, details }).unwrap();
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error((error as ErrorType)?.data?.message);
      }
    });
  };

  const onError = (error: any) => toast.error(error?.data?.message);

  const handleDeliver = async () => {
    if (window.confirm("Mark product as delivered?")) {
      await deliverOrder(id);
      refetch();
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main className="grid md:grid-cols-[1fr_360px] gap-4 md:gap-6">
      <OrderItems items={order.items} />
      <section className="space-y-3">
        <ShippingDetails shippingAddress={order.shippingAddress} />
        <OrderSummary items={order.items} />
        <p
          className={`${
            order.isPaid ? "bg-core-main" : "bg-red-700"
          } py-3 !mt-4 rounded-2xl text-white font-medium text-center select-none`}
        >
          {order.isPaid
            ? order.isDelivered
              ? "Delivered"
              : "Not Delivered"
            : "Not Paid"}
        </p>
        {userInfo && userInfo.isAdmin && (
          <div className="!mt-10 px-6 py-4 rounded-2xl bg-core-white font-medium">
            <table className="font-medium border-separate border-spacing-y-2">
              <tbody>
                <tr>
                  <td className="w-[154px] font-semibold text-core-main">
                    Paid
                  </td>
                  <td>
                    {order.isPaid
                      ? new Date(order.paidAt).toLocaleString("UK")
                      : "Not Paid"}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-core-main">Delivered</td>
                  <td>
                    {order.isDelivered ? (
                      new Date(order.deliveredAt).toLocaleString("UK")
                    ) : (
                      <button onClick={handleDeliver} className="text-red-600">
                        Not Delivered
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {!order.isPaid && !isLoadingPay && (
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{ color: "blue", shape: "pill" }}
            className="!my-8 md:!my-12"
          />
        )}
      </section>
    </main>
  );
};

const Order = () => {
  const { data: paypal, isLoading: isLoadingPayPal } =
    useGetPaypalClientIdQuery({});

  return isLoadingPayPal ? (
    <Loader />
  ) : (
    <PayPalScriptProvider
      options={{
        clientId: paypal.clientId,
        currency: "USD",
      }}
    >
      <OrderContent />
    </PayPalScriptProvider>
  );
};

export default Order;
