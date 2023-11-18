import {apiSlice} from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL  } from "../constant";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: {...order}
            }),
        }),
        getOrderDetails: builder.query({
            query: (productId) => ({
                url:`${ORDERS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: "PUT",
                body: {...details},
            })
        }),
        getPayPalClientId: builder.query({
            query: ()=> ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        viewOrderedProducts: builder.query({
            query: (id) => ({
                url:`${ORDERS_URL}/${id}`
            })
        }),
        getMyOrders: builder.query({
            query:() => ({
                url: `${ORDERS_URL}/mine`
            }),
            keepUnusedDataFor: 5
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL
            }),
            keepUnusedDataFor: 5
        })
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetOrdersQuery, useViewOrderedProductsQuery  } = orderApiSlice;