import React, { use, useEffect, useState } from 'react'
import {data, Link, useParams} from "react-router-dom";
import {read} from "./api/apiCore"
import ShowImage from './ShowImage';
import "../src/css/ProductView.css"
import AddToCart from './AddToCart';
const ProductView = () => {
    const { productId } = useParams();
    const [error, setError] = useState(false);
    const [product, setProduct] = useState({});


    const getProduct = (productId) => {
        read(productId).then(data => {
            if(data.error){
                setError(error);
            } else {
                setProduct(data);
            }
        })
    }
useEffect(()=>{
    getProduct(productId);
} ,[])


    return (
        <div className='product-view-container'>
            <div className='prodcut-view-page'>
            <div className="product-view">
                {/* <p className='pro'>this is product view</p> */}
                <div className="product-view-pic"><ShowImage item={product} url="product" className="product-view-image"/></div>
                <div className="product-view-info">
                    <h3>{product.name}</h3>
                    <div className="product-view-price">
                        <h4 >${product.price}</h4>
                    </div>
                    <div className="product-view-quantity">
                        <p>Quantity:</p>
                        <input
                            id="quantityInput"
                            type="number"
                            min="1"
                            defaultValue="1"
                        />
                    </div>
                   <AddToCart product={product} className='add-to-cart'/>
                    {/* <button className='add-to-cart'><i className="fa-solid fa-cart-shopping"></i> ADD TO CART</button> */}
                </div>
            </div>
            <div className="product-description">
                <h3>DESCRIPTION</h3> 
                <div className="description-box"><p>{product.description}</p></div>
            </div>
            </div>
        </div>
    )
}

export default ProductView
