// Here we are making a get request with redux
import { PRODUCTS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: ({keyword, pageNumber}) => ({
                url : PRODUCTS_URL,
                params: {
                    keyword,
                    pageNumber
                }
            }),
            providesTags:['Products'],
            keepUnusedDataFor : 5
        }),
        getProduct : builder.query({
            query: (id) => ({
                url : `${PRODUCTS_URL}/${id}`,
            }),
            keepUnusedDataFor : 5
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"]
        }),
    }),
});

export const {useGetProductsQuery, useGetProductQuery, useCreateReviewMutation} = productsApiSlice;
