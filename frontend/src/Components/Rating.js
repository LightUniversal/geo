import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'


const Rating = ( { value, text}) => {
    // function Namer({ name }) {
    //     console.log(name)
    // }
    // Namer({
    //     name : "Solver"
    // }) 
  return (
    <div className='rating flex items-center'>
        <span className=' text-orange-400'>
            {
                value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />
            }
        </span>
        <span className=' text-orange-400'>
            {
                value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />
            }
        </span>
        <span className=' text-orange-400'>
            {
                value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />
            }
        </span>
        <span className=' text-orange-400'>
            {
                value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />
            }
        </span>
        <span className=' text-orange-400'>
            {
                value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />
            }
        </span>
        
        <span className="rating-text font-bold">
            { text && text }
        </span>
    </div>
  )
}

export default Rating
