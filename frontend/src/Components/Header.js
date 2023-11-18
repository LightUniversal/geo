import React from "react";
import {
  FaBars,
  FaCartPlus,
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";




const Header = () => {
  const navLink = useRef();
  const navLinks = document.querySelector(".nav-links");
  const onToggleMenu = function () {
    navLink.current.classList.toggle("top-[9%]");
  };

  const { accountinfo } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCaller] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutCaller().unwrap();
      dispatch(logout());
      // navigate('/login');
      toast.success("You are logged out");
    } catch(err) {
      console.log(err);
    }
  };

  return (


    <div>
      <header className="bg-slate-900 shadow-lg text-white py-2">
        <nav className="flex justify-between items-center w-[92%]  mx-auto">
          <div>
            <img
              className="w-16 cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
              alt="..."
            />
          </div>
          <div
            className="nav-links duration-500 md:static absolute z-10 bg-slate-900 md:min-h-fit min-h-[40vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5"
            ref={navLink}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
                <Link to={"/"} className="hover:text-gray-500 flex items-center" href="#">
                  Home <FaHome className="mx-1 mb-0.5" />
                </Link>
              </li>
              <li>
                <a className="hover:text-gray-500 flex items-center" href="#">
                  Shop <FaCartPlus className="mx-1 mb-0.5" />
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500 flex items-center" href="#">
                  About Us <FaInfoCircle className="mx-1 mb-0.5" />
                </a>
              </li>
              <li className="relative search">
                <button type="submit" className="absolute right-0 top-0 bg-black rounded-r-full h-12 px-5">
                  <FaSearch className=" text-white"  />
                </button>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className=" fw-bolder w-full  rounded-full px-5 h-12"
                  placeholder="search product"
                />
              </li>
            </ul>
          </div>
          
            {accountinfo ? (
              <div className="flex justify-content-center  items-center  gap-6">
                <Link to={"/cart"} className="text-xl relative font-bold text-green-900 flex items-center">
                <small className=" px-2 text-sm py-0.5 left-6 rounded-full -top-3 z-10 absolute bg-green-600 text-white">2</small>
                <FaCartPlus className="mx-2 text-2xl relative -top-0.5" /> Cart
              </Link>
              <button onClick={logoutHandler} className=" flex items-center font-bold text-red-600 px-5 py-3 rounded-md">
               Logout <FaSignOutAlt className=" mx-1 relative -top-0.0 text-2xl align-middle" />
              </button>
              <Link to={"/register"} className=" flex items-center font-bold text-green-800 px-5 py-3 rounded-md">
                <FaUserCircle className=" mx-1 relative -top-0.5 text-2xl align-middle" />{accountinfo.email}
            </Link>
            <FaBars
              onClick={onToggleMenu}
              name="menu"
              className="text-2xl cursor-pointer md:hidden"
            />
          </div>
            ): (
              <div className="flex items-center gap-6">
              <Link to={"/login"} className=" flex items-center font-bold text-white px-5 py-3 rounded-md">
               Login
              </Link>
              <Link to={"/register"} className=" flex items-center font-bold text-white px-5 py-3 rounded-md">
                <FaUserCircle className=" mx-2 relative  text-xl align-middle" />Register
            </Link>
            <FaBars
              onClick={onToggleMenu}
              name="menu"
              className="text-2xl cursor-pointer md:hidden"
            />
          </div>
            )}
            
             
            
        </nav>
      </header>
    </div>
  );
};

export default Header;
