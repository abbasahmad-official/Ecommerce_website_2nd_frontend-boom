// Search.js
import React, { Fragment, useEffect, useState } from 'react';
import ShowImage from './ShowImage';
import { useLocation, Link } from 'react-router-dom';
import { list } from './api/apiCore';

const useQuery = () => new URLSearchParams(useLocation().search);

const Search = () => {
  const query = useQuery();
  const search = query.get("query");
  const category = query.get("category");

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    list({ search: search || undefined, category }).then((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        setResults(res);
      }
    });
  }, [search, category]);

  const searchProducts = () => {
    return <div className="new-arrival search-products">
      <div className="new-arrival-header">
        <h2>Searched results: </h2> <h3>{results.length} products found</h3>
      </div>
      <div className="new-arrival-products">
        {results.map((product, i) => {
          return <div key={i} className="product-card">
            <Link to={`/product/${product._id}`} className='search-link'>
              <ShowImage item={product} url="product" />
            </Link>
            <div className="product-card-content">
              <Link to={`/product/${product._id}`} className='search-link'>
                <h3 className="product-title">{product.name}</h3>
              </Link>
              <p className="product-price">${product.price}</p>
              <button className="product-button">Add to Cart</button>
            </div>
          </div>
        })}

      </div>
    </div>
  }
  return (
    <Fragment>
    <div className='product-by-category'>
    {/* // <div className="search-page">
    //   <h2>Search Results</h2>
    //   {error && <p className="error">{error}</p>}
    //   {results.length === 0 ? (
    //     <p>No products found.</p>
    //   ) : (
    //     <div className="search-results">
    //       {results.map((product) => (
    //         <div key={product._id}>
    //           <h4>{product.name}</h4>
    //           <p>{product.description}</p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div> */}
    {searchProducts()}
    </div>
    </Fragment>
  );
};

export default Search;
