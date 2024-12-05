import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({ url: CATEGORY_URL }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (name) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
