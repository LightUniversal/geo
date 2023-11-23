import React from "react";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserAlt, FaUserCircle } from "react-icons/fa";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
    // check for password match
    if (password !== cpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ email, password, name, }).unwrap();
        // The unwrap extracts values
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Welcome to God's Exclusive Ornament...");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <Form onSubmit={submitHandler} className="register w-4/5 md:w-2/4 mx-auto my-12 py-5 px-6 rounded-2xl text-slate-900">
      <div className="title font-bold border-b py-4 border-slate-200">
        <h3 className=" flex items-center text-3xl">
          Register <FaUserCircle className=" text-slate-700 mx-1" />
        </h3>
      </div>
      <div className="name my-8">
        <label htmlFor="name" className="flex items-center font-bold">Name <FaUserAlt className=" text-slate-700 mx-1" /></label>
        <input type="text" name="name" id="name" value={name} onChange={ (e) => setName(e.target.value)} placeholder="Enter your name" className=" border  text-black font-bold w-full py-3 px-2 rounded-lg " />
      </div>
      <div className="email my-8">
        <label htmlFor="email" className="flex items-center font-bold">Email <FaEnvelope className=" text-slate-700 mx-1" /></label>
        <input type="email" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" className=" border  text-black font-bold w-full py-3 px-2 rounded-lg " />
      </div>
      <div className="password my-8">
        <label htmlFor="password" className="flex items-center font-bold">Password <FaLock className=" text-slate-700 mx-1" /></label>
        <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} id="password" placeholder="Enter your password" className=" border  text-black font-bold w-full py-3 px-2 rounded-lg " />
      </div>
      <div className="cpassword my-8">
        <label htmlFor="cpassword" className="flex items-center font-bold">Confirm Password <FaLock className=" text-slate-700 mx-1" /></label>
        <input type="password" name="cpassword" value={cpassword} onChange={(e)=> setCPassword(e.target.value)} id="cpassword" placeholder="Confirm your password" className=" border  text-black font-bold w-full py-3 px-2 rounded-lg " />
      </div>
      <button type="submit" onClick={submitHandler} className="flex bg-slate-900 my-5 py-3 px-3 rounded-full text-white items-center font-bold">Register <FaUserCircle className=" text-slate-400 mx-2  " /></button>
      <Link to={"/login"} className=" text-blue-400 border-t font-bold border-slate-700 py-2 w-full block">Already have an account? Login</Link>
    </Form>
  );
};

export default RegisterScreen;
