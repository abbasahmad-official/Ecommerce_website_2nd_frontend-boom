import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import { getCategories, getFilteredProducts } from "./api/apiCore"
import "./css/Shop.css";
import ShowImage from './ShowImage';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
import { prices } from "./fixedPrices"
import AddToCart from './AddToCart';
import ReactPaginate from 'react-paginate';

const Shop = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [myFilters, setMyFilters] = useState({ filters: { category: [], price: [] } });
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0)
  const [limit, setLimit] = useState(6);
  const [filteredResults, setFilteredResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);


  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data)
      }
    })
  }

  const loadProducts = (newSkip, limit, filters = {}) => {
    getFilteredProducts(newSkip, limit, filters).then(data => {
      if (data.error) {
        setProducts([]);
        setSize(0);
        setError(data.error);
      } else {
        setProducts(data.data || []);
        setSize(data.size || 0);
        setSkip(newSkip);
        setError(false);
      }
    })
  }

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setShowFilters(!mobile); // show filters by default on desktop
  };

  useEffect(() => {
    handleResize();
    loadCategories();
    loadProducts(0, limit, myFilters.filters);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    if (filterBy === "price") {
      const priceRange = handlePrice(filters);
      newFilters.filters[filterBy] = priceRange;
    } else {
      console.log("shop", filters, filterBy)
      newFilters.filters[filterBy] = filters;
    }

    setMyFilters(newFilters);
    // console.log(newFilters.filters)
    loadProducts(0, limit, newFilters.filters);
  };


  const handlePrice = (value) => {
    const data = prices;
    let array = []
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    };
    return array;

  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  let currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageCount = Math.ceil(products.length / productsPerPage);
  const changePage = ({ selected }) => {
    setCurrentPage(selected + 1);
  }



  return (
    <div className='shop-container-large'>
      {isMobile && (
        <div className="mobile-filter-toggle">
          <button onClick={() => setShowFilters(prev => !prev)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      )}

      <div className="shop-container">
        
          <div className={showFilters ? "show-filters" : "hide-filters"} >
          <div className="filter-selection">
            <div className="filter-selection-header">
              <h3>FILTER SELECTION </h3>
            </div>
            <Checkbox categories={categories} handleFilters={filters => (handleFilters(filters, "category"))} />
            <Radiobox prices={prices} handleFilters={filters => (handleFilters(filters, "price"))} />
            {/* <div className="filter-selection-box">
              <h4 id='price'>Price</h4>
              <div className="checkbox">
                <input type="radio" />
                <p>price</p>
              </div>
            </div> */}
          </div>
          </div>
        

        <div className="shop-products">
          <div className="upper-bar"><p>{products.length} products are found</p></div>
          <div className="shop-products-view">


            {currentProducts.map((product, i) =>     <div key={i} className="product-card">
              <Link  to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
             <ShowImage item={product} url="product" />
              </Link>
             <div className="product-card-content">
             <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}> <h3 className="product-title">{product.name}</h3></Link>
              <p className="product-price">${product.price}</p>
             <AddToCart product={product}/>
              {/* <button className="product-button">Add to Cart</button> */}
              </div>
            </div>)}
          </div>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="pagination-container"
        activeClassName="active"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        />
        </div>
        </div>
    </div>
  );
};

export default Shop;
