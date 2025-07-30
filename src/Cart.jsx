import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ShowImage from "./ShowImage";
import './css/Cart.css';
import { itemTotal, getCart, updateItem, removeItem, emptyCart } from './cartHelpers';
import { useSelector, useDispatch } from "react-redux";
import { setCartMenuValue } from './redux/slices/cartSlicer';
import { getStripeCheckout, createOrder } from "./api/apiCore";
import { isAuthenticated } from "./auth/index";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isProceed, setIsProceed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [sessionId, setSessionId] = useState();
  const [data, setData] = useState({
    name: "",
    address: "",
    phone_no: ""
  });

  const shipping = 3;
  const { token, user } = isAuthenticated();
  const auth = isAuthenticated();
  const userId = auth?.user?._id;
  const userToken = auth?.token;
  const hasProducts = cart && cart.length > 0;

  const getMyCart = () => {
    const allItems = getCart();
    setCart(allItems);
  };

  useEffect(() => {
    getMyCart();
  }, []);

  const handleChange = (itemId) => (event) => {
    let newCount = parseInt(event.target.value);
    if (isNaN(newCount) || newCount <= 0) newCount = 1;

    const updatedItems = cart.map((item) =>
      item._id === itemId ? { ...item, count: newCount } : item
    );
    setCart(updatedItems);
    updateItem(itemId, newCount);
  };

  const removeCartItem = (itemId) => {
    const updatedCart = removeItem(itemId);
    setCart(updatedCart);
    dispatch(setCartMenuValue(updatedCart.length));
  };

  useEffect(() => {
    const subTotals = cart.reduce((acc, item) => acc + (item.count * item.price), 0);
    setSubTotal(subTotals);
    setTotal((subTotals + shipping).toFixed(2));

    dispatch(setCartMenuValue(cart.length));
  }, [cart]);

  const proceedCheckout = () => {
    setIsProceed(true);
    console.log("clicked");
  };

  const handleChangeInfo = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
  };

  const addPersonalInfo = () => (
    <Fragment>
      <div className='order-info'>
        <div className="group-items">
          <form onSubmit={submitForm}>
            <div className="order-item">
              <h3>Personal info</h3>
              <div className="personal-info">
                <label>
                  Full Name
                  <input required type="text" value={data.name} onChange={handleChangeInfo("name")} />
                </label>
                <label>
                  Phone No
                  <input
                    value={data.phone_no}
                    onChange={handleChangeInfo("phone_no")}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="123-456-7890"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="order-item">
              <h3>Address info</h3>
              <div className="personal-info">
                <label>
                  Full Address
                  <input required type="text" value={data.address} onChange={handleChangeInfo("address")} />
                </label>
              </div>
            </div>
            <div className="order-item">
              <h3>Shipping Method</h3>
              <div className="personal-info">
                <div className="items-group-container">
                  <div className="radio-option">
                    <input type="radio" id="cod" name="payment" onChange={handleChangePayment} defaultChecked />
                    <p>COD</p>
                  </div>
                  <div className="radio-option">
                    <input type="radio" id="stripe" name="payment" onChange={handleChangePayment} />
                    <p>Stripe</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="button">
              <button className='btn' onClick={handleCheckout}>CHECKOUT</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );

  const handleChangePayment = (event) => {
    setPaymentMethod(event.target.id);
  };

  const handleCheckout = async () => {
    if (paymentMethod === "cod" && data.name && data.address && data.phone_no) {
      console.log("cod");
      await paymentByCod();
      emptyCart();
    }
    if (paymentMethod === "stripe" && data.name && data.address && data.phone_no) {
      console.log("stripe");
      await paymentByStripe();
    }
  };

  const paymentByCod = async () => {
    if (userId && userToken && hasProducts) {
      const orderData = setOrder(data.name, data.address, data.phone_no, "payment is on cash on delivery");
      createOrder(userId, userToken, orderData)
        .then(() => {
          console.log("order created");
        })
        .catch((err) => {
          console.error("order creation error by cod:", err);
          setData({ ...data, error: "error creating order" });
        });
    }
  };

  const paymentByStripe = async () => {
    if (userId && userToken && hasProducts) {
      const orderData = await setOrder(data.name, data.address, data.phone_no, "paid by stripe");
      getStripeCheckout(userId, userToken, cart, orderData)
        .then((data) => {
          setSessionId(data.id);
          stripePromise.then((stripe) => {
            return stripe.redirectToCheckout({
              sessionId: data.id,
            });
          });
        })
        .catch((err) => {
          console.error("Checkout error:", err);
          setData({ ...data, error: "Failed to initiate Stripe Checkout." });
        });
    }
  };

  const setOrder = (name, address, phone_no, payment_status) => {
    const order = {
      products: cart,
      amount: total,
      address: address,
      full_name: name,
      phone_no: phone_no,
      payment_status: payment_status,
    };
    return order;
  };

  return (
    <div className="cart-fullpage">
      <div className='cart-page'>
        {cart.length > 0 ? (
          isProceed ? (
            addPersonalInfo() // Show personal info form
          ) : (
            <div className="cart-products" style={isProceed ? { display: "none" } : { display: "" }}>
              <h3>Shopping Cart</h3>
              <div className="cart-products-list">
                {cart.map((item, i) => (
                  <div className="cart-product" key={i}>
                    <ShowImage item={item} url="product" className='cart-image-product' />
                    <div className="cart-product-info">
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                    <input
                      id="quantityInput"
                      type="number"
                      min="1"
                      value={item.count}
                      onChange={handleChange(item._id)}
                    />
                    <p className='price'>${item.price * item.count}</p>
                    <img className='dustbin' width={20} src="/src/assets/dustbin.png" alt="remove-item" onClick={() => removeCartItem(item._id)} />
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="cart-products">
            <h3>Shopping Cart</h3>
            <div className="cart-products-list no-product">
              <p>No Products Found</p>
            </div>
          </div>
        )}

        <div className='all'>
          <div className="cart-info">
            <div className="cart-info-block">
              <div className="block-row">
                <p>{itemTotal()} item</p>
                <p className='price'>${subTotal.toFixed(2)}</p>
              </div>
              <div className="block-row">
                <p>shipping</p>
                <p className='price'>${shipping.toFixed(2)}</p>
              </div>
            </div>

            <div className="cart-info-block">
              <div className="block-row">
                <p>Total</p>
                <p className='price'>${total}</p>
              </div>
            </div>

            <div className={`cart-info-block ${isProceed ? "hide" : "active"}`}>
              <div className={`block-row ${isProceed ? "hide" : "active"}`}>
                {isAuthenticated() ? (
                  <button onClick={proceedCheckout} disabled={isProceed}>PROCEED TO CHECKOUT</button>
                ) : (
                  <button onClick={() => navigate("/signin")} disabled={isProceed}>Sign in</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
