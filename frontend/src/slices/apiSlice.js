// import { createSlice   } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

const baseurl = BASE_URL;
const baseQuery = fetchBaseQuery({baseUrl : baseurl});

export const apiSlice = createApi({
    baseQuery,
    tagTypes : ["Product", "Order", "User"],
    endpoints : (builder) => ({}, [])
});