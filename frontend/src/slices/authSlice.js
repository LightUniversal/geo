// set and remove user credentails to the local storage
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountinfo: localStorage.getItem("accountinfo") ? JSON.parse(localStorage.getItem("accountinfo")) : null
};

// create slice
const authSlice = new createSlice({
    name:"auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.accountinfo = action.payload;
            localStorage.setItem('accountinfo', JSON.stringify(action.payload));
        } ,
        logout: (state, action) => {
            state.accountinfo = null;
            localStorage.removeItem("accountinfo");
        },
        register: (state, action) => {
            state.accountinfo = action.payload;

        }
    }
});


export const { setCredentials, logout, register } = authSlice.actions;
export default authSlice.reducer;