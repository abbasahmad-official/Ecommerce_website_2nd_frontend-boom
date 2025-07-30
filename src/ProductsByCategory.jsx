// Search.js
import React, { Fragment, useEffect, useState } from 'react';
import ShowImage from './ShowImage';
import { useLocation, useParams, Link } from 'react-router-dom';
import { list, getProductsByCategory } from './api/apiCore';

// const useQuery = () => new URLSearchParams(useLocation().search);

const ProductsByCategory = () => {
    const location = useLocation();
    const { categoryId } = useParams();
    const [size, setSize] = useState();
    //   const query = useQuery();
    //   const search = query.get("query");
    //   const category = query.get("category");

    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setResults([]);
        setSize(0);
        getProductsByCategory(categoryId).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setResults(data.data);
                setSize(data.size)
            }
        })
        // list({ search: search || undefined, category }).then((res) => {
        //   if (res.error) {
        //     setError(res.error);
        //   } else {
        //     setResults(res);
        //   }
        // });
    }, [categoryId]);

    const searchProducts = () => {
        return <div className="new-arrival search-products">
            <div className="new-arrival-header">
                <h3>Searched results: </h3> <h3>{size || "0"} product found</h3>
            </div>
            <div className="new-arrival-products">
                {results.map((product, i) => {
                    return <div key={i} className="product-card">
                        <Link to={`/product/${product._id}`}  className='search-link'>
                            <ShowImage item={product} url="product" />
                        </Link>
                        <div className="product-card-content">
                            <Link to={`/product/${product._id}`} className='search-link' >
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
            {/* <p>{error}</p> */}
            <div className='category-name'>
                <h2 >{results.length > 0 ? results[0].category.name : "No Category Found"}</h2>
            </div>
            {/* <p> {JSON.stringify(results)}</p> */}
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

export default ProductsByCategory;
