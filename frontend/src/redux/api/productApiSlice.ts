import { PRODUCT_URL, IMAGE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, params }) => ({
        url: `${PRODUCT_URL}/get/${category}?${params || ""}`,
      }),
      keepUnusedDataFor: 15,
      providesTags: ["Product"],
    }),
    getFilterOptions: builder.query({
      query: (category) => ({
        url: `${PRODUCT_URL}/get/filterOptions?category=${category}`,
      }),
      keepUnusedDataFor: 15 * 60,
    }),
    getProductById: builder.query({
      query: (id) => ({ url: `${PRODUCT_URL}/${id}` }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getNewProducts: builder.query({
      query: () => ({ url: `${PRODUCT_URL}/get/new` }),
      keepUnusedDataFor: 5,
    }),
    getRandomProducts: builder.query({
      query: () => ({ url: `${PRODUCT_URL}/get/random` }),
      keepUnusedDataFor: 5,
    }),
    getAllProducts: builder.query({
      query: () => ({ url: `${PRODUCT_URL}/get/all`, credentials: "include" }),
      providesTags: ["Product"],
    }),
    searchProducts: builder.query({
      query: (query) => ({ url: `${PRODUCT_URL}/get?search=${query}` }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${IMAGE_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    deleteImage: builder.mutation({
      query: (img) => ({
        url: `${IMAGE_URL}/${img}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFilterOptionsQuery,
  useGetProductByIdQuery,
  useGetNewProductsQuery,
  useGetRandomProductsQuery,
  useGetAllProductsQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
} = productApiSlice;
