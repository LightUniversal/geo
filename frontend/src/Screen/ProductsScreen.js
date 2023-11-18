import React from "react";
import { FaCartPlus, FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const ProductsScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  if(data) {
     console.log(data.products)
  } else {
    console.log("data")
  }
  return (
    <div className=" bg-slate-50 p-4 ">
      <h2 className="w-3/4 mx-auto font-bold text-2xl my-5 flex items-center text-slate-600">
        Recent Products <FaShoppingCart />
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error?.data?.message}</div>
      ) : (
        <div className="flex justify-between flex-wrap items-center gap-3 w-5/6  mx-auto ">
          {data.products.map((product) => (
              <Link key={product._id}
              to={`/product/${product._id}`}
              className="one shadow-xl rounded-xl px-2 py-3 md:w-1/4 my-3 w-full"
            >
              <div className="image flex justify-center">
                <img src={product.image} className=" w-44" alt="" />
              </div>
              <div className="productDets shadow-lg rounded-xl px-3 py-3">
                <div className="title">
                  <h4 className=" font-bold">Product Name 1</h4>
                </div>
                <div className="rating flex justify-between">
                  <div className="rates flex text-orange-300">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <div className="ratingValue relative font-bold text-slate-700 mb-2 -top-1">
                    3 reviews
                  </div>
                </div>
                <div className="price flex justify-between">
                  <h3 className=" font-bold text-green-600">&euro; 45</h3>
                  <Link
                    to={"/cart"}
                    className="flex items-center bg-slate-800 text-xs px-2 py-2 rounded-sm text-white font-bold"
                  >
                    Add <FaCartPlus className=" mx-1" />
                  </Link>
                </div>
              </div>
            </Link>
        ))}
        </div>
        
      )}

      
    </div>
  );
};

export default ProductsScreen;
