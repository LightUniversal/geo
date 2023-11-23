import React from "react";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserCircle } from "react-icons/fa";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { accountinfo } = useSelector((state) => state.auth);

  // Check for the redirect search parameter
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    if (accountinfo) {
      navigate(redirect);
    }
  }, [accountinfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault(true);
    try {
      const res = await login({ email, password }).unwrap();
      // The unwrap extracts values
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Experience the beauty in Cakes...");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <Form onSubmit={submitHandler} className="login w-4/5 md:w-2/4 mx-auto rounded-2xl text-black my-12 py-5 px-6 ">
      <div className="title font-bold border-b py-4 border-slate-200">
        <h3 className=" flex items-center text-3xl">
          Login <FaUserCircle className=" text-slate-700 mx-1" />
        </h3>
      </div>
      <div className="email my-3">
        <label htmlFor="email" className="flex items-center font-bold">Email <FaEnvelope className=" text-slate-700 mx-1" /></label>
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" id="email" placeholder="Enter your email" className=" text-black font-bold border w-full py-3 px-2 rounded-md " />
      </div>
      <div className="password my-8">
        <label htmlFor="password" className="flex items-center font-bold">Password <FaLock className=" text-slate-700 mx-1" /></label>
        <input type="password" value={password} onChange={(e)=> { setPassword(e.target.value)}} name="password" id="password" placeholder="Enter your password" className=" border w-full py-3 px-2 rounded-md   text-black font-bold" />
      </div>
      <button type="submit" onClick={submitHandler} className="flex bg-slate-800 my-5 py-3 px-3 rounded-full text-white items-center font-bold">Login <FaSignInAlt className=" text-slate-200 mx-2  " /> 
      </button>
      <Link to={"/register"} className=" text-blue-400 py-3 font-bold border-t w-full block">Register a new account</Link>
    </Form>
  );
};

export default LoginScreen;
