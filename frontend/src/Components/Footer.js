import React from "react";
import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" footer w-full border-t  text-white border-slate-200 mt-6  mx-auto flex justify-around gap-2 flex-wrap-reverse">
      <div className="copy font-bold text-slate-800 text-sm py-8">
        God's Exclusive Ornament &copy; 2023
      </div>
      <div className="contactdetails py-8">
        {/* <h4 className="title text-xl font-bold my-1 border-slate-600 border-b pb-2 px-2 mb-3">
          God's Exclusive Ornament
        </h4> */}
        <div>
          <a
            href="mailto:lightsinfo78@gmail.com"
            className=" flex items-center font-bold text-blue-400 text-sm"
          >
            <FaEnvelope className=" mx-2 text-3xl p-2 border text-blue-600 border-blue-800 rounded-full" />
            lightsinfo78@gmail.com
          </a>
          <a
            href="tel:+2347058032078"
            className=" flex items-center font-bold text-blue-400 text-sm my-2"
          >
            <FaPhoneAlt className=" mx-2 border text-blue-600 border-blue-800 rounded-full p-2 text-3xl" />
            07058032078
          </a>
          <div className="location flex items-center font-bold text-blue-400 text-sm my-2">
            <FaLocationArrow className=" mx-2 text-3xl text-blue-600 border-blue-800 border rounded-full p-2" />{" "}
            Based on
            <br />
            United Kingdom
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
