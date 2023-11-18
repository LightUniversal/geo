import React from 'react'
import { FaCcPaypal, FaCheck, FaInfoCircle, FaPaypal } from "react-icons/fa";

const CheckOutScreen = () => {
  return (
    <div>
      <div className="top flex justify-around text-white items-center bg-slate-800 p-5 rounded-lg">
        <div className="userinfo bg-blue-700 rounded-lg p-3 mx-2">
          <h4 className=" font-bold flex items-center text-white">
            Sign In <FaCheck className=" mx-1" />
          </h4>
        </div>
        <div className="details bg-blue-700 rounded-lg p-3 mx-2">
          <h4 className=" font-bold flex items-center">
            User Details <FaInfoCircle className=" mx-1" />
          </h4>
        </div>
        <div className="paymentmethod bg-blue-700 rounded-lg p-3 mx-2">
          <h4 className=" font-bold flex items-center">
            Payment Method <FaCcPaypal className=" mx-1" />
          </h4>
        </div>
        <div className="placeorder bg-blue-700 rounded-lg p-3 mx-2">
          <h4 className=" font-bold flex items-center">
            Place Order <FaInfoCircle className=" mx-1" />
          </h4>
        </div>
      </div>
    </div>
  )
}

export default CheckOutScreen
