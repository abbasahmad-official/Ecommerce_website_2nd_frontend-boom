import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";
import { useParams } from "react-router-dom";
import "../css/AddProduct.css"; // Reuse the same styles as AddProduct

const UpdateProduct = ({productId, onBack}) => {
//   const { productId } = useParams();
  const auth = isAuthenticated();
  const user = auth?.user;
  const token = auth?.token;

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
    updatedProduct: "",
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
    error,
    updatedProduct,
    formData,
  } = values;

  // Load categories and product
  useEffect(() => {
    const init = async () => {
      try {
        const productData = await getProduct(productId);
        const categoriesData = await getCategories();

        if (productData?.error || categoriesData?.error) {
          setValues((v) => ({
            ...v,
            error: productData?.error || categoriesData?.error,
          }));
        } else {
          setValues((v) => ({
            ...v,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category._id,
            shipping: productData.shipping ? "1" : "0",
            quantity: productData.quantity,
            categories: categoriesData,
            formData: new FormData(),
          }));
        }
      } catch (err) {
        setValues((v) => ({ ...v, error: "Failed to load product." }));
      }
    };

    init();
  }, [productId]);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "", updatedProduct: "" });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: "" });

    updateProduct(productId, user._id, token, formData).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          updatedProduct: data.name,
          error: "",
          formData: new FormData(),
        });
      }
    });
  };

  const showSuccess = () =>
    updatedProduct && (
      <p className="success-msg">{`${updatedProduct} updated successfully.`}</p>
    );

  const showError = () =>
    error && <p className="error-msg">{error}</p>;

  const updateForm = () => (
    <form className="product-form" onSubmit={clickSubmit}>
      <div className="form-group">
        <label>Photo</label>
        <input
          type="file"
          onChange={handleChange("photo")}
          accept="image/*"
        />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={handleChange("price")}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select onChange={handleChange("category")} value={category}>
          <option>Select</option>
          {categories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select onChange={handleChange("shipping")} value={shipping}>
          <option value="">Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={handleChange("quantity")}
        />
      </div>

      <button type="submit" className="submit-btn">
        Update Product
      </button>
    </form>
  );

  return (
    <div className="update-container">
          {onBack && (
  <button onClick={onBack} className="back-btn btn">
    ← Back to Product List
  </button>
)}
      <h2>Update Product</h2>
     
      {showSuccess()}
      {showError()}
      {updateForm()}
  
    </div>
  );
};

export default UpdateProduct;
