import React from "react";
import {
  FaCaretUp,
  FaInfoCircle,
  FaShippingFast,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice.js";
import {
  useGetProductQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Rating from "../Components/Rating.js";
import { toast } from "react-toastify";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductQuery(productId);

  console.log(product);
  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const { accountinfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h4>{error?.data?.message}</h4>
      ) : (
        <>
          <div className=" w-4/5 mx-auto mt-6">
            <div className="top"></div>
            <div className="productdescription flex justify-between flex-wrap w-full  gap-12 md:w-4/5">
              <div className="product shadow-sm rounded-2xl  w-full md:w-3/6 p-7 flex justify-center bg-slate-50 items-center">
                <img src={product.image} alt="" className=" w-56  md:w-4/6 md:h-4/6" />
              </div>
              <div className="description w-full md:w-2/3 p-3 rounded-lg">
                <div className="head border-b-2 border-slate-100 py-7 ">
                  <h3 className=" font-bold text-3xl mb-3">{product.name}</h3>
                  <p className="font-bold">{product.description}</p>
                  <div className="ratings flex items-center mt-3 text-orange-400 font-bold">
                  <Rating
                    value={(product.rating)}
                    
                  />
                    <span className="mt-1 text-black mx-2">
                      ({product.rating} reviews)
                    </span>
                  </div>
                </div>
                <div className="price border-b-2 border-slate-100 py-7 ">
                  <h3 className="font-bold text-2xl">&euro; {product.price}</h3>
                  <p className="info font-bold text-sm mt-2">
                    Information concerning the pricing...
                  </p>
                </div>
                <div className="stock flex items-center border-slate-100 border-b py-5">
                  <small className=" text-lg flex items-center font-bold">
                    Status <FaInfoCircle className="mx-1" />
                  </small>
                  <small className="mx-1 font-semibold bg-green-50 rounded-xl px-3 py-1">
                    Available 
                  </small>
                </div>
                <div className="qty flex items-center justify-between py-5 font-bold">
                  <p>
                    Qty
                  </p>
                  <input type="number" className=" border mx-2 py-2 px-2 rounded-md" name="qty" id="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
                  
                </div>
                <div className="actions">
                  <div className="py-5">
                    <button className="buy rounded-full bg-black text-white py-3 px-3 w-28 font-bold">
                      Buy
                    </button>
                    <Link
                      to={"/cart"}
                      className="addtocart rounded-full bg-white text-black border-2 py-3 px-3 w-48 mx-5 font-bold"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Link>
                    <p className=" font-bold flex items-center mt-3">
                      <FaShippingFast className="mr-2" /> Free Delivery on
                      orders above &euro; 40.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {loadingReview && <p>Loading ....</p>}
            {accountinfo ? (
              <div className="reviews mt-6">
                <div className="title">
                  <h3 className="font-bold text-2xl my-3 px-4 flex justify-between md:w-2/5 w-full">
                    Reviews{" "}
                    <FaCaretUp className=" border rounded-full text-3xl p-0.5" />
                  </h3>
                </div>
                {product.reviews.length === 0 && (
                  <h4 className=" font-bold">No reviews</h4>
                )}
                <div className="review  md:w-2/5 w-full py-2 rounded-lg  mb-3">
                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="py-2 px-3 rounded-lg shadow-sm  my-2"
                    >
                      <strong className=" flex items-center py-3">
                        <FaUserCircle className="mx-1 mb-0.5" /> {review.name}
                      </strong>
                      <div className="mx-3 py-2 font-bold">
                        <Rating value={review.rating} />
                        <p className=" text-xs py-2">{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="writereview ">
                  <div className="head">
                    <h4 className=" font-bold text-lg my-1 bg-slate-50 border border-slate-50 py-3 px-5 rounded-lg md:w-2/5 w-full">
                      Write review
                    </h4>
                    <p className=" font-semibold my-2 px-5">Rating</p>
                    <select
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className=" bg-slate-50  px-4 py-2 border border-slate-50 rounded-lg"
                    >
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="commentarea">
                    <textarea
                      name="comment"
                      id="comment"
                      placeholder="Write review"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className=" px-5 py-3 font-semibold border md:w-2/5 w-full mt-3 rounded-md"
                    ></textarea>
                    <button
                      className="submit bg-slate-900 text-white block px-3 py-2 font-bold text-sm rounded-md"
                      type="submit"
                      onClick={submitHandler}
                    >
                      {" "}
                      Comment{" "}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className=" font-semibold">
                Please{" "}
                <Link to={"/login"} className=" text-blue-500">
                  Login
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
