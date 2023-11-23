import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store.js";
import ProductsScreen from "./Screen/ProductsScreen.js";
import ProductScreen from "./Screen/ProductScreen";
import HomeScreen from "./Screen/HomeScreen.js";
import CartScreen from "./Screen/CartScreen.js";
import App from "./App";
import ShippingScreen from "./Screen/ShippingScreen.js";
import PaymentScreen from "./Screen/PaymentScreen.js";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen.js";
import ProfileScreen from "./Screen/ProfileScreen.js";
import LoginScreen from "./Screen/LoginScreen.js";
import RegisterScreen from "./Screen/RegisterScreen.js";
import MakePayment from "./Screen/MakePayment.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/search/:keyword" element={<HomeScreen />}></Route>
      <Route path="/page/:pageNumber" element={<HomeScreen />}></Route>
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomeScreen />}
      ></Route>


      <Route path="/products" element={<ProductsScreen />} />
      <Route path="/makepayment" element={<MakePayment />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/placeorder" element={<PlaceOrderScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
