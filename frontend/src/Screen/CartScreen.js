import React from "react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   get cart state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
    console.log("Working...");
  };
  const addToCartHandler = async (item, qty) => {
    dispatch(
      addToCart({
        ...item,
        qty,
      })
    );
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <strong className=" w-3/5 py-12 px-3 mx-auto block">
          Your Cart is empty{" "}
          <Link to="/" className=" text-blue-400">
            Go Back
          </Link>
        </strong>
      ) : (
        <div className="cartsection w-full md:w-3/4 mx-auto mt-3 px-3">
          {/* <h3 className=" flex items-center  font-bold my-2 text-2xl text-center border-b py-3">
            Shopping Details
            <FaInfoCircle className="mx-2 mb-0.5 text-green-600" />
          </h3> */}
          <div className="flex flex-wrap justify-around">
            <div className="items py-5 px-3 ">
              {cartItems.map((item) => (
                <div key={item._id} className="border-b py-4 item">
                  <div className="flex items-center gap-3 mx-2 flex-wrap justify-between ">
                    <div className=" w-1/6 p-3 rounded-full md:w-2/12 bg-slate-50">
                      <img src={item.image} alt={item.name} className=" w-full" />
                    </div>
                    <div>
                      <Link
                        to={`/product/${item._id}`}
                        className="name block font-bold"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      <h4 className="price font-bold  text-green-700">
                        &euro; {item.price}
                      </h4>
                    </div>
                    <div className="flex font-bold items-center">
                      <h4 className="font-bold">Qty :</h4>
                      <input
                        type="number"
                        className=" border mx-2 py-2 px-2 rounded-md"
                        name="qty"
                        id="qty"
                        value={item.qty}
                        onChange={(e) => {
                          addToCartHandler(item, Number(e.target.value));
                        }}
                      />
                    </div>
                    <div>
                      <button
                        className=" flex items-center bg-red-600 text-white px-2 py-1 text-sm rounded-full font-bold"
                        onClick={() => {
                          removeFromCartHandler(item._id);
                        }}
                      >
                        Clear <FaTrashAlt className=" mx-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary w-3/4 md:w-3/12 mx-3">
              <div className="border px-12 py-4 rounded-md">
                <h4 className=" text-3xl font-bold">
                  Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)})
                </h4>
                <p className="font-bold text-xl py-1 text-green-700 border-t my-2">
                  &euro;{" "}
                  {cartItems
                    .reduce((a, i) => a + i.qty * i.price, 0)
                    .toFixed(2)}
                </p>
                <Link
                  to={"/shipping"}
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                  className="checkout bg-green-600 px-3 py-2 font-bold text-sm text-white rounded-md"
                >
                  Proced to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
