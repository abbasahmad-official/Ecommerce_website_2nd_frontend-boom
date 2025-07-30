import React from 'react';
import './css/ProductCard.css'; // Or add to your existing CSS

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-img" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>
      <button className="product-button">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
