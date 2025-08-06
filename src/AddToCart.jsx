import React, { Fragment, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { itemTotal, addItem } from './cartHelpers';
import { setCartMenuValue } from './redux/slices/cartSlicer';

const AddToCart = ({ product, className = '' }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false); // default to false

  const addToCart = () => {
    addItem(product, () => {
      toast.success('Item added to cart successfully!');
      const total = itemTotal(); // get updated cart count
      dispatch(setCartMenuValue(total));
    });
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile(); // run immediately before paint
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <Fragment>
      <button className={`product-button ${className}`} onClick={addToCart}>
        {isMobile ? (
          <span>
            <span> +</span> cart
          </span>
        ) : (
          'Add to Cart'
        )}
      </button>
    </Fragment>
  );
};

export default AddToCart;
