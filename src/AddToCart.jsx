import React, { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import {getCart, itemTotal} from "./cartHelpers"
import { setCartMenuValue } from './redux/slices/cartSlicer';

import {addItem} from "./cartHelpers"

const AddToCart = ({product, className= ""}) => {
  const dispatch = useDispatch();


  const addToCart = ()=>{
    addItem(product,()=>{
       toast.success('Item added to cart successfully!');
        // 🔥 Dispatch updated cart count to Redux immediately
      const total = itemTotal(); // fetch updated cart count from localStorage
      dispatch(setCartMenuValue(total)); 
    });
  }
  return (
    <Fragment>
    <button className={`product-button ${className}`} onClick={addToCart}>Add to Cart</button>
    {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </Fragment>
  )
}

export default AddToCart
