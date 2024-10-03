import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    // creating product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        body: product,
        method: "POST",
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
          user_id,
        },
        method: "DELETE",
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = appApi;

export default appApi;

