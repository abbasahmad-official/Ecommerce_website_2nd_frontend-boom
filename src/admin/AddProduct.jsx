import React, { Fragment, useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories } from "./apiAdmin";
import "../css/AddProduct.css"; // You'll create this file

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  useEffect(() => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      error: "",
      createdProduct: "",
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "", createdProduct: "" });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        event.target.reset();
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          quantity: "",
          category: "",
          shipping: "",
          photo: "",
          loading: false,
          error: "",
          createdProduct: data.name,
          formData: new FormData(),
        });
      }
    });
  };

  const showLoading = () => loading && <div className="info info-loading">Loading...</div>;
  const showError = () => error && <div className="info info-error">{error}</div>;
  const showSuccess = () => createdProduct && <div className="info info-success">{`${createdProduct} product has been created`}</div>;

  const newPostForm = () => (
    <form className="product-form" encType="multipart/form-data" onSubmit={clickSubmit}>
      <h2>Create New Product</h2>

      <label>
        Product Photo
        <input type="file" onChange={handleChange("photo")} accept="image/*" />
      </label>

      <label>
        Product Name
        <input type="text" value={name} onChange={handleChange("name")} placeholder="Enter product name" />
      </label>

      <label>
        Description
        <textarea value={description} onChange={handleChange("description")} placeholder="Enter product description" />
      </label>

      <label>
        Price
        <input type="number" value={price} onChange={handleChange("price")} placeholder="Enter price" />
      </label>

      <label>
        Category
        <select onChange={handleChange("category")} value={category}>
          <option value="">Select category</option>
          {categories && categories.map((c, i) => (
            <option key={i} value={c._id}>{c.name}</option>
          ))}
        </select>
      </label>

      <label>
        Shipping
        <select onChange={handleChange("shipping")} value={shipping}>
          <option value="">Select shipping</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>

      <label>
        Quantity
        <input type="number" value={quantity} onChange={handleChange("quantity")} placeholder="Enter quantity" />
      </label>

      <button type="submit">Create Product</button>
    </form>
  );

  return (
    <Fragment>
      <div className="form-wrapper">
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newPostForm()}
      </div>
    </Fragment>
  );
};

export default AddProduct;
