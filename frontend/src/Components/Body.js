import React from 'react'
import { FaShopify } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Body = () => {
  return (
    <div className='body flex md:w-3/5 sm:w-fullgap-3  mx-auto bg-slate-50 rounded-2xl px-5 justify-between items-center'>
        <div className="offer py-24 relative  w-1/2 flex justify-center">
           <div>
           <h5 className=' text-slate-900 py-3 my-2 font-bold'>
                God's Exclusive Ornament
            </h5>
            <h1 className=' font-extrabold md:text-3xl my-2 text-lg'>
                We Offer the Best 
                <br />
                Products for Weddings
            </h1>
            
            <button className=' bg-green-500 flex items-center text-white px-5 rounded-md font-extrabold  py-5'>
                Shop Now <FaShopify className='mx-1'/>
            </button>
           </div>
        </div>
        <Link to={"/product/21221"} className=" flex images px-10 justify-center relative bg-slate-50 shadow-xl rounded-xl w-1/2 py-4 items-center">
            <img src="/images/photo1.png" alt="" className=' md:w-1/2 mb-7 w-44' />
        </Link>
    </div>
  )
}

export default Body