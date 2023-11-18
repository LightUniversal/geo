import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutScreen from "./CheckOutScreen";


const ShippingScreen = () => {

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { accountinfo } = auth;
  const { shippingAddress } = cart;

  //   check if the shippingAddress exits

  const [email, setEmail] = useState(accountinfo?.email || "");
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        country,
        city,
        email,
      })
    );
    navigate("/payment");
  };
  return (
    <div className=" px-3 md:w-3/4 mx-auto mt-7">
      <CheckOutScreen />
      <div className="details mt-5 font-bold text-slate-700 bg-slate-50 py-6 rounded-lg px-10">
        <form action="#" onSubmit={submitHandler}>
            <div className="city my-2">
                <label htmlFor="city" className="block font-bold">Street Address</label>
                <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} id="city" placeholder="street Address" className=" border rounded-md px-4 py-3 md:w-2/5 w-full" />
            </div>
            <div className="email my-2">
                <label htmlFor="email" className="block font-bold">Email Address</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email Address" className=" border rounded-md px-4 py-3 md:w-2/5 w-full" />
            </div>
            <div className="country my-2">
                <label htmlFor="country" className="block font-bold">Country</label>
                <input type="text" name="country"  value={country} onChange={(e) => setCountry(e.target.value)} id="country" placeholder="Country" className=" border rounded-md px-4 py-3 md:w-2/5 w-full" />
            </div>
            <Link to={"/payment"} className=" inline-block bg-blue-600 text-white px-4 py-3 font-bold rounded-full" onClick={submitHandler}>Proceed</Link>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
