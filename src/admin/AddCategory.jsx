import React, { Fragment, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";
import "../css/AddCategory.css"

const AddCategory = () => {
  const [name, setName] = useState(""); 
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(false);

  // Safely get user and token
  const auth = isAuthenticated();
  const user = auth?.user;
  const token = auth?.token;

  const handleChange = (event) => {
    setError(""); 
    setSuccess(false);
    setName(event.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setError(""); 
    setSuccess(false);

    if (!user || !token) {
      setError("You must be logged in to create a category.");
      return;
    }

    createCategory(user._id, token, { name }).then((data) => {
      if (data?.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setName("");
      }
    });
  };

  const showSuccess = () =>
    success && <p className="success-msg">{name} category is created</p>;

  const showError = () =>
    error && <p className="error-msg">{error}</p>;

  const createCategoryForm = () => (
    <form onSubmit={clickSubmit} className="category-form">
      <div className="form-group">
        <label htmlFor="category">Category Name:</label>
        <input
          type="text"
          id="category"
          value={name}
          onChange={handleChange}
          placeholder="Enter category"
          autoFocus
        />
      </div>
      <button type="submit" className="submit-btn">Create Category</button>
    </form>
  );

  if (!user || !token) {
    return (
      <Fragment>
        <p className="error-msg">You must be logged in to create a category.</p>
        <Link to="/signin" className="nav-link">Go to Sign In</Link>
      </Fragment>
      
    );
  }

  return (
   
      <div className="category-container">
        {showSuccess()}
        {showError()}
        {createCategoryForm()}
      </div>
    
  );
};

export default AddCategory;
