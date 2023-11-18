import React from "react";
import CheckOutScreen from "./CheckOutScreen";
import { FaDotCircle, FaEuroSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { savePayment } from "../slices/cartSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PaymentScreen = () => {

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  // if there is no shipping address in the local storage 
  const { shippingAddress} = cart;

  useEffect(() => {
      if(!shippingAddress) {
          navigate('/shipping');
      }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePayment(paymentMethod));
      navigate('/placeorder');
  }
  return (
    <div className="w-full px-3 md:w-3/4 mt-6 mx-auto ">
      <CheckOutScreen />
      <form className="paymentmethod justify-center w-full flex md:w-3/6 mx-auto py-10" onSubmit={submitHandler}>
        <div>
        <h4 className=" my-3 font-bold text-3xl flex items-center">Payment Method <FaEuroSign className=" mx-1 text-blue-600" /></h4>
        <p className="flex items-center font-bold">
        <input type="radio" className="mr-2 my-2" onChange={(e) => setPaymentMethod(e.target.value)} name="paymentMethod" id="PayPal" value="Credit Card" checked /> Credit Card 
        </p>
        <Link to={"/placeorder"} onClick={submitHandler} className=" mt-2 inline-block bg-blue-600 text-white px-4 py-3 font-bold rounded-full" >
            Proceed
        </Link>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;
