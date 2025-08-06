import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { getCart, itemTotal, addItem } from "./cartHelpers";
import { setCartMenuValue } from './redux/slices/cartSlicer';

const AddToCart = ({ product, className = "" }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false); // ✅ moved to top level

  const addToCart = () => {
    addItem(product, () => {
      toast.success('Item added to cart successfully!');
      const total = itemTotal(); // get updated cart count
      dispatch(setCartMenuValue(total));
    });
  };

useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkIsMobile(); // run on mount
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [isMobile]);

  return (
    <Fragment>
      <button className={`product-button ${className}`} onClick={addToCart}>
        {isMobile ? <span> <span> +</span> cart</span> : "Add to Cart"}
      </button>
    </Fragment>
  );
};

export default AddToCart;
