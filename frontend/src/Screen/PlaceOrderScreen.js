import { useEffect } from "react";
import CheckOutScreen from "./CheckOutScreen";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import {
  FaInfoCircle,
  FaLocationArrow,
  FaSearchLocation,
  FaShippingFast,
  FaUserCircle,
} from "react-icons/fa";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.city) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.city, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        total: cart.total,
      }).unwrap();
      console.log(res);
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className=" w-full md:w-3/4 mx-auto mt-6">
      {/* <CheckOutScreen /> */}
      <div className="details text-white flex-wrap flex justify-between mx-4 px-4 my-1 mb-12 rounded-lg bg-blue-900 py-5">
        <div className=" flex items-center">
          <FaUserCircle className="text-5xl mx-5 border border-slate-600 rounded-full p-2" />
          <div className="user">
            <h3 className="mb-4 text-2xl font-semibold">User</h3>
            <p>
              <small className="my-2 block font-semibold">
                {cart.shippingAddress.email}
              </small>
            </p>
          </div>
        </div>
        <div className=" flex items-center">
          <FaShippingFast className=" text-5xl mx-5 border border-slate-600 rounded-full p-2" />
          <div className="user font-bold">
            <h3 className="mb-4 text-2xl">Order Info</h3>
            <p>
              <small className="block">
                Country: {cart.shippingAddress.country}
              </small>
              <small>Payment Method: {cart.paymentMethod}</small>
              <small className="status bg-red-500 font-bold my-3 text-white px-3 py-2 rounded block">
                Not Paid
              </small>
            </p>
          </div>
        </div>
        <div className=" flex items-center ">
          <FaLocationArrow className="text-5xl mx-5 border border-slate-600 rounded-full p-2" />
          <div className="user font-bold">
            <h3 className="text-2xl mb-4 font-bold">Deliver to</h3>
            <p>
              <small>Address: {cart.shippingAddress.city}</small>

              <small className="status bg-red-500 my-3 text-white px-3 py-2 rounded block">
                Not Delivered
              </small>
            </p>
          </div>
        </div>
      </div>
      <div className="details flex flex-wrap my-3">
        <div className="ordereditems w-full mx-5 md:w-3/6">
          <h4 className="font-bold text-xl">Ordered Items</h4>
          {cart.cartItems.map((item, index) => (
            <div
              className="items flex justify-around border-t py-4"
              key={index}
            >
              <div className="w-1/6 mx-2">
                <img src={item.image} alt={item.name} className="" />
              </div>
              <div className="name font-bold mx-2">
                <Link to={`/products/${item.product}`}>{item.name}</Link>
              </div>
              <div className="quantity font-bold">
                <h4>QUANTITY</h4>
                <p className="text-green-900 mt-2">{item.qty} X &euro; {item.price} </p>
              </div>
              <div className="subtotal font-bold">
                <h4>SUBTOTAL</h4>
                <p className=" text-green-700 mt-2">&euro; {item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="summary border border-slate-100 md:w-3/4 w-full mx-5 md:mx-auto py-5 relative shadow-lg rounded-lg">
          <div className="flex justify-between font-bold border-slate-200 py-2 px-7">
            <h5>Items Price</h5>{" "}
            <h6 className=" text-green-800">&euro; {cart.itemsPrice}</h6>
          </div>
          <div className="flex justify-between font-bold  border-slate-200 border-t  py-2 px-7">
            <h5>Shipping Price</h5>{" "}
            <h6 className=" text-green-800">&euro; {cart.shippingPrice}</h6>
          </div>
          <div className="flex justify-between font-bold  border-slate-200 border-t  py-2 px-7">
            <h5>Tax</h5> <h6 className=" text-green-800">&euro; {cart.taxPrice}</h6>
          </div>
          <div className="flex justify-between font-bold  border-slate-200 border-t border-b py-2 px-7">
            <h5>Total</h5> <h6 className=" text-green-800">&euro; {cart.total}</h6>
          </div>
          <Link
            to={"/profile"}
            className="inline-block mx-7 my-4 bg-green-800 text-white px-4 py-5 font-bold rounded-md "
          >
            Place Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
