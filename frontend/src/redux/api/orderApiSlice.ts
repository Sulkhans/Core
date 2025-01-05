import { apiSlice } from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        credentials: "include",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/all`,
        credentials: "include",
      }),
    }),
    payOrder: builder.mutation({
      query: ({ id, details }) => ({
        url: `${ORDER_URL}/${id}/pay`,
        method: "PUT",
        body: details,
        credentials: "include",
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/deliver`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
