import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories, list } from "../api/apiCore"
import { isAuthenticated, signout } from '../auth';
import ShowImage from '../ShowImage';
import { useSelector, useDispatch } from "react-redux";
import {itemTotal, getCart} from "../cartHelpers"
import "../css/navbar.css";
import { setCartMenuValue } from '../redux/slices/cartSlicer';

const Navbar = () => {
  
  const dispatch = useDispatch();
  const menuCount = useSelector((state) => state.cart.cartMenuValue);
  useEffect(()=>{
     const total = itemTotal();
      dispatch(setCartMenuValue(total));

  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isAccountIconOpen, setIsAccountIconOpen] = useState(false)
  const [data, setData] = useState({
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const [stickToTop, setStickToTop] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);

  const { token, user } = isAuthenticated();

  const navigate = useNavigate();

  const showCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    showCategories();
    const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 250) { // Change this threshold as needed
      setStickToTop(true);
    } else {
      setStickToTop(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value })
  }

  const searchSubmit = (e) => {
    e.preventDefault();
   navigate(`/search?query=${data.search}&category=${data.category}`);
  setData({...data, search:""})
  };

  const handleSignout = () => {
    signout(() => {
      setIsAccountIconOpen(false);
      navigate("/");
    })
  }

  return (
    <Fragment>
      <div className='header-account'>
        <div className='account-icon' onClick={() => setIsAccountIconOpen(!isAccountIconOpen)}>
          <p><i className="fa-solid fa-user"></i></p>
        </div>
        {<div className={`account-dropdown ${isAccountIconOpen ? 'open' : ''}`}>
          <ul className=' account-li'>
            {isAuthenticated() ? (
              <Fragment>
                <li
                  onClick={() => {
                    navigate("/user/dashboard");
                    setIsAccountIconOpen(false);
                  }}
                >
                  Dashboard
                </li>
                <li
                  onClick={() => {
                    // Signout logic should go here
                    handleSignout();
                  }}
                >
                  Signout
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li
                  onClick={() => {
                    navigate("/signin");
                    setIsAccountIconOpen(false);
                  }}
                >
                  Sign in
                </li>
                <li
                  onClick={() => {
                    navigate("/signup");
                    setIsAccountIconOpen(false);
                  }}
                >
                  Sign up
                </li>
              </Fragment>
            )}


          </ul>
        </div>}

      </div>
      <div className='nav-header'>
        {/* Top Section */}
        <div className='upper-nav'>

          {/* Logo */}
          <Link to={"/"}> <div className="img logo">
            <img src="/assets/boom-logo.jpg" alt="logo" />
          </div>
          </Link>

          {/* Cart */}
          <div className="cart">
            <div className="cart-image">
              <Link to="/cart" className="cart-icon-wrapper">
                <img width="24px" src="/assets/icons8-fast-cart-50.png" alt="cart-icon" />
                {/* <div className="item-count-badge" style={{display:showMobileMenu ? "block" : "none"  }}><p>1</p></div> */}
              </Link>
            </div>
            <div className="cart-data">
              <div className="item-count-badge"><p>{menuCount}</p></div>
              <div className="cart-total">
                <h5>CART:</h5>
                <p>Price: $30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={searchSubmit}>
          <div className="search-bar-wrapper">
            <div className="search-bar">
              < input id='search' type="text" placeholder="Search..." className="search-input" onChange={handleChange("search")} value={data.search} />
              <select className="search-select"
                onChange={handleChange("category")}
                value={data.category}
              >
                <option>All categories</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button className="search-button" type='submit'>
                <img width="24" src="/assets/icons8-search-50.png" alt="search" />
              </button>
            </div>
          </div>
        </form>

        {/* Hamburger Icon (Mobile) */}
        <div className="mobile-menu-icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <i className="fa fa-bars"></i>
        </div>

        {/* Mobile / Lower Nav */}
        <div className={`lower ${showMobileMenu ? 'show-mobile' : ''}`}>
          <div className="lower-nav">
            <div className="categories">
              <div className="category-button" onClick={() => setIsOpen(!isOpen)}>
                <i className="fa fa-bars"></i>
                <span className="dropdown-toggle">Categories</span>
                <i className="fa-solid fa-caret-down"></i>
              </div>
              {
                <ul className={`category-dropdown ${isOpen ? 'open' : ''}`}>
                  {categories.map((category, i) => (
                    <li onClick={()=> {navigate(`/category/${category._id}`)
                  setIsOpen(!isOpen)
                  }} key={i}>{category.name}</li>
                  ))}

                  {/* <li>Fashion</li>
                <li>Books</li>
                <li>Sports</li> */}
                </ul>
              }
            </div>
            <div className="pages">
              <ul onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <li onClick={() => navigate("/")}>HOME</li>
                <li onClick={() => navigate("/shop")}>SHOP</li>
                {/* <li>About us</li> */}
              </ul>
            </div>
          </div>
        </div>
  
        
      </div>
                {stickToTop && <div className={`lower sticky-navbar ${stickToTop ? 'fixed-to-top' : ''} ${showMobileMenu ? 'show-mobile' : ''}`}>
          <div className='sticky'>
          <div className="lower-nav">
            <div className="categories">
              <div className="category-button" onClick={() => setIsOpen(!isOpen)}>
                <i className="fa fa-bars"></i>
                <span className="dropdown-toggle">Categories</span>
                <i className="fa-solid fa-caret-down"></i>
              </div>
              {
                <ul className={`category-dropdown ${isOpen ? 'open' : ''}`}>
                  {categories.map((category, i) => (
                    <li onClick={()=> {navigate(`/category/${category._id}`)
                  setIsOpen(!isOpen)
                  }} key={i}>{category.name}</li>
                  ))}

                </ul>
              }
            </div>
            <div className="pages">
              <ul onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <li onClick={() => navigate("/")}>HOME</li>
                <li onClick={() => navigate("/shop")}>SHOP</li>
            
              </ul>
            </div>
          </div>
          <div className='sticky-search'>
          <img width="24" height="24" src="/assets/icons8-search-50.png" alt="search" onClick={() => setShowSearchIcon(!showSearchIcon)} />
          
          {showSearchIcon &&  <form onSubmit={searchSubmit}>
          <div className="search-bar-wrapper">
            <div className="search-bar">
              <input type="text" placeholder="Search..." className="search-input" onChange={handleChange("search")} value={data.search} />
              <button className="search-button" type='submit'>
                <img width="24" src="/src/assets/icons8-search-50.png" alt="search" />
              </button>
            </div>
          </div>
        </form>   }

          </div>
          </div>
        </div>}
      {/* {data.searched && searchProducts()} */}
    </Fragment>
  );
};

export default Navbar;
