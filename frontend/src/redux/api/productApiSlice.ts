import { PRODUCT_URL, IMAGE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, page, brand, priceMin, priceMax, ...details }) => {
        const queryParams = new URLSearchParams();
        if (brand) queryParams.append("brand", brand);
        if (priceMin) queryParams.append("priceMin", priceMin);
        if (priceMax) queryParams.append("priceMax", priceMax);
        if (details) {
          Object.entries(details).forEach(([key, value]) => {
            queryParams.append(key, String(value));
          });
        }
        return {
          url: `${PRODUCT_URL}/get/${category}?page=${page}&${queryParams.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
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
