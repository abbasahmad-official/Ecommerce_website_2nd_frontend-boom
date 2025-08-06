import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { itemTotal, addItem } from "./cartHelpers";
import { setCartMenuValue } from './redux/slices/cartSlicer';

const AddToCart = ({ product, className = "" }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false); // Start with false

  const addToCart = () => {
    addItem(product, () => {
      toast.success('Item added to cart successfully!');
      const total = itemTotal();
      dispatch(setCartMenuValue(total));
    });
  };

  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile(); // ✅ Set it on mount
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <Fragment>
      <button className={`product-button ${className}`} onClick={addToCart}>
        {isMobile ? (
          <span><span> +</span> cart</span>
        ) : (
          "Add to Cart"
        )}
      </button>
    </Fragment>
  );
};

export default AddToCart;
