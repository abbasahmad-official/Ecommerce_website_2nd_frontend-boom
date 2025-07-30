import React, {useState, useEffect, Fragment} from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./css/home.css"
import ProductCard from './ProductCard'
import {getProducts, getCategories} from "./api/apiCore"
import ShowImage from './ShowImage'
import { data } from 'react-router-dom'
import { slides } from './sliderImages'
import AddToCart from './AddToCart'

const Home = () => {
  const navigate = useNavigate();
const [isOpen, setIsOpen] = useState(false);
  const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [categories, setCategories]  = useState([]);
    const [error, setError] = useState(false);

    const [slide, setSlide] = useState(0);

    const nextSlide = () =>{
     setSlide(slide === slides.length - 1 ? 0 : slide + 1) 
    }

    useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 3000);
  return () => clearInterval(interval);
}, [slide]);

    const showProductsBySell = () => {
        getProducts("sold")
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProductsBySell(data);
                }
            })
    }
    const showProductsByArrival = () => {
        getProducts("createdAt")
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProductsByArrival(data);
                }
            })
    }
    const showCategories = () => {
      getCategories().then(data=>{
        if(data.error){
          setError(data.error);
        } else {
            setCategories(data)
        }
      })
    }


    useEffect(() => {
        showProductsByArrival();
        showProductsBySell();
        showCategories();
        // console.log(categories);
    }, [])
  return (
    <div>
       <div className="hero-categories">
          <div className="categories">
            <div className="category-button" onClick={() => {setIsOpen(!isOpen)
            }}>
              <i className="fa fa-bars"></i>
              <span className="dropdown-toggle"  >Categories</span>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            
              <ul className={`category-dropdown ${isOpen? "show-dropdown-mobile": "hide-dropdown"}`}>
                {categories.map((category,i) => (<li onClick={()=>navigate(`/category/${category._id}`)} key={i} value={category._id}>{category.name}</li>))}
                {/* <li>Fashion</li>
                <li>Books</li>
                <li>Sports</li> */}
              </ul>
          
          </div>
        </div>
      <div className='hero'>
       
        <div className="poster-image" >
          <div className="image" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {slides.map((img,i)=>(
              <Fragment key={i}>

              <img src={img.src} alt={img.alt} key={i} className={slide === i ? "img": "img img-hide"} 
               onClick={() => navigate(img.url)}
              />
             
              </Fragment>
          
          ))}
          </div>
          <span className='indicators'>
            {slides.map((_, i)=>(
            <p onClick={()=>(setSlide(i))} key={i} className={slide === i ? "indicator": "indicator indicator-not-active"}> <i className='fa fa-circle'></i> </p>
            ))} 
          </span>
        </div>
      </div>
      <div className="new-arrival">
        <div className="new-arrival-header">
          <h2>New Arrival</h2>
        </div>
        <div className="new-arrival-products">
          
            {/* <img width="180px" src="/src/assets/headphones.jpg" alt="headphones" /> */}
            
            {productsByArrival.map((product, i)=>{
             return  <div key={i} className="product-card">
              <Link  to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
             <ShowImage item={product} url="product" />
              </Link>
             <div className="product-card-content">
             <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}> <h3 className="product-title">{product.name}</h3></Link>
              <p className="product-price">${product.price}</p>
             <AddToCart product={product}/>
              {/* <button className="product-button">Add to Cart</button> */}
              </div>
            </div>
            }) }
          
         
            {/* <img width="180px" src="/src/assets/headphones.jpg" alt="headphones" /> */}
            {/* <div className="product-card">
              <img src='/src/assets/headphones.jpg' className="product-img" />
             <div className="product-card-content">
              <h3 className="product-title">product.title</h3>
              <p className="product-price">$product.price</p>
              <button className="product-button">Add to Cart</button>
              </div>
            </div> */}
          
        </div>
      </div>
      <div className="new-arrival">
        <div className="new-arrival-header">
          <h2>Top sellers</h2>
        </div>
        <div className="new-arrival-products">
          
            {/* <img width="180px" src="/src/assets/headphones.jpg" alt="headphones" /> */}
           
            {productsBySell.map((product, i)=>{
             return <div key={i} className="product-card">
             <Link  to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
             <ShowImage item={product} url="product" />
              </Link>
             <div className="product-card-content">
             <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}> <h3 className="product-title">{product.name}</h3></Link>
              <p className="product-price">${product.price}</p>
              <AddToCart product={product}/>
              {/* <button className="product-button">Add to Cart</button> */}
              </div>
            </div>
            }) }
          
         
            {/* <img width="180px" src="/src/assets/headphones.jpg" alt="headphones" /> */}
            {/* <div className="product-card">
              <img src='/src/assets/headphones.jpg' className="product-img" />
              <div className="product-card-content">
              <h3 className="product-title">product.title</h3>
              <p className="product-price">$product.price</p>
              <button className="product-button">Add to Cart</button>
              </div>
            </div> */}
          
        </div>
      </div>
    </div>
  )
}

export default Home
