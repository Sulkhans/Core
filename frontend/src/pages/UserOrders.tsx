import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../redux/api/orderApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../redux/constants";
import Loader from "../components/Loader";

const UserOrders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetUserOrdersQuery({});

  useEffect(() => {
    if (error) toast.error("Failed to load orders");
  }, [error]);

  return isLoading ? (
    <Loader />
  ) : (
    !error && (
      <table className="w-full rounded-md overflow-hidden text-center">
        <thead>
          <tr className="*:p-4  bg-core-main text-white *:font-medium">
            <th className="!pl-6">Order</th>
            <th>ID</th>
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
              <td>
                <img
                  src={BASE_URL + order.items[0].images[0]}
                  className="size-16 mx-auto"
                />
              </td>
              <td className="!pl-6">{order._id}</td>
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
    )
  );
};

export default UserOrders;
