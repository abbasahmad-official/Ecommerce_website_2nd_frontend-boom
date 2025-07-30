import React, { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import ShowImage from "../ShowImage";
import "../css/ManageProducts.css"; // <-- custom CSS

const ManageProducts = ({onUpdateClick}) => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = async () => {
    try {
      const allproducts = await getProducts();
      setProducts(allproducts);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (productId) => {
    try {
      await deleteProduct(productId, user._id, token);
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="manage-container">
      {/* <h2 className="manage-title">Manage Products</h2> */}
      <ul className="product-list">
        {products.map((product, i) => (
          <Fragment key={i}>
            <li className="product-item">
              <div className="product-info">
                <span className="product-name">{product.name}</span>

                <div className="product-image">
                  <ShowImage item={product} url="product" from="list" />
                </div>
              </div>

              <div className="action-buttons">
                {/* <Link to={`/admin/product/update/${product._id}`}> */}
                  <button className="btn update-btn" onClick={() => onUpdateClick(product._id)}>Update</button>
                {/* </Link> */}

                <button
                  className="btn delete-btn"
                  onClick={() => removeProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
