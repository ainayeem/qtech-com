import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // getUsers: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     if (args) {
    //       args.forEach((item: TQueryParam) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }

    //     return {
    //       url: "/user",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["user"],
    //   transformResponse: (response: TResponseRedux<any[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),

    // updateUser: builder.mutation({
    //   query: (args) => ({
    //     url: `/user/change-status/${args.id}`,
    //     method: "PATCH",
    //     body: args.data,
    //   }),
    //   invalidatesTags: ["user"],
    // }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
