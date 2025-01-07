import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Reload from "../../assets/reload.svg?react";

const Orders = () => {
  const navigate = useNavigate();
  const { data: orders, refetch, isLoading, error } = useGetAllOrdersQuery({});

  useEffect(() => {
    if (error) toast.error("Failed to load orders");
  }, [error]);

  return isLoading ? (
    <Loader />
  ) : (
    !error && (
      <>
        <button
          onClick={refetch}
          className="mb-4 p-2.5 rounded-md bg-core-main hover:bg-core-dark active:bg-core-dark transition-colors"
        >
          <Reload className="size-5 stroke-white" />
        </button>
        <table className="w-full rounded-md overflow-hidden">
          <thead>
            <tr className="*:p-4  bg-core-main text-white *:font-medium *:text-start">
              <th className="!pl-6">ID</th>
              <th>User</th>
              <th>Price</th>
              <th>Items</th>
              <th>Paid</th>
              <th className="!pr-6">Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr
                key={order._id}
                className="*:p-4 text-sm text-nowrap group even:bg-core-white hover:bg-core-main hover:bg-opacity-10 transition-all cursor-pointer"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                <td className="!pl-6">{order._id}</td>
                <td>{order.user._id}</td>
                <td>{order.totalPrice}</td>
                <td>{order.items.length}</td>
                <td>
                  {order.isPaid
                    ? new Date(order.paidAt).toLocaleString("UK")
                    : "Not Paid"}
                </td>
                <td className="!pr-6">
                  {order.isDelivered
                    ? new Date(order.deliveredAt).toLocaleString("UK")
                    : "Not Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
};

export default Orders;
