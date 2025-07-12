import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      // query: (args) => "/product",
      query: (args) => {
        const params = new URLSearchParams();

        if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, value.toString());
            }
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["fruitItem"],
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["fruitItem"],
    }),

    createProduct: builder.mutation({
      query: (productItems) => ({
        url: "/product/create-product",
        method: "POST",
        body: productItems,
      }),
      invalidatesTags: ["fruitItem"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fruitItem"],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery, useCreateProductMutation, useDeleteProductMutation } = productApi;
