import React from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";

const ProfileScreen = () => {
  return (
    <div className=" profile flex justify-around w-4/5  mt-8 items-center mx-auto">
      <div className="userdetails flex items-center justify-between shadow-lg py-12 px-12 rounded-xl w-1/5">
        <div>
          <FaUserCircle className=" text-8xl text-blue-800" />
        </div>
        <div className="accountdetails mx-3">
          <h3 className="username font-bold">Username</h3>
          <h4 className="useremail font-bold">useremail</h4>
        </div>
      </div>
      <div className="updateUserdetails my-3 w-2/5">
        <form action="#" className="">
          <div className="name ">
            <label htmlFor="name" className="block font-bold mx-4">
              Name
            </label>
            <input
              id="name"
              className="border rounded-full py-4 border-slate-300 font-semibold px-4 w-full"
              type="text"
              placeholder="update your name"
            />
          </div>
          <div className="email my-4">
            <label htmlFor="email" className="block font-bold mx-4">
              Email
            </label>
            <input
              id="name"
              className="border py-4 rounded-full font-semibold border-slate-300 px-4 w-full"
              type="email"
              placeholder="update your email"
            />
          </div>
          <div className="password my-4">
            <label htmlFor="password" className="block font-bold mx-4">
              Password
            </label>
            <input
              id="password"
              className="border py-4 rounded-full font-semibold border-slate-300 px-4 w-full"
              type="password"
              placeholder="update your password"
            />
          </div>
          <div className="confirm my-4">
            <label htmlFor="confirm" className="block font-bold mx-4">
              Confirm Password
            </label>
            <input
              id="password"
              className="border py-4 rounded-full font-semibold border-slate-300 px-4 w-full"
              type="password"
              placeholder="confirm the password"
            />
          </div>
          <button type="submit" className=" bg-blue-800 text-white py-3 px-4 font-bold rounded-full">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
