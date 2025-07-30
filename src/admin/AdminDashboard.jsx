import React, { useState } from 'react';
import "../css/AdminDashBoard.css";
import AddProduct from './AddProduct';
import ManageProducts from './ManageProducts';
import AddCategory from './AddCategory';
import UpdateProduct from './UpdateProduct';
import Order from "./Order"


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("manage-products");
  const [view, setView] = useState("manage"); // 'manage' | 'update'
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleUpdateClick = (productId) => {
    setSelectedProductId(productId);
    setView("update");
  };

  const handleBack = () => {
    setView("manage");
    setSelectedProductId(null);
  };




  const isActive = (path) => ({
    backgroundColor: activeSection === path ? "#f4debeff" : "#ffffff",
    // cursor: "pointer"
  });

  return (
    <div className="box">
      <div className="admin-dashboard">
        <div className="admin-side-bar">  
            <div
            className="manage-products item"
            onClick={() => setActiveSection("manage-products")}
            style={isActive("manage-products")}
          >
            <i className="far fa-calendar-check"></i>
            <p>Manage Products</p>
          </div>
          
            <div
            className="add-item item"
            onClick={() => setActiveSection("add-category")}
            style={isActive("add-category")}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <p>Add Category</p>
          </div>

          <div
            className="add-item item"
            onClick={() => setActiveSection("add-product")}
            style={isActive("add-product")}
          >
            <i className="fa-solid fa-circle-plus"></i>
            <p>Add Product</p>
          </div>

          

          <div
            className="orders item"
            onClick={() => setActiveSection("order")}
            style={isActive("order")}
          >
            <i className="far fa-calendar-check"></i>
            <p>Orders</p>
          </div>
        </div>

        <div className="admin-detail">
          {activeSection === "add-product" && <AddProduct />}
           {/* {view === "manage" && (
        <ManageProducts onUpdateClick={handleUpdateClick} />
      )}
      {view === "update" && selectedProductId && (
        <UpdateProduct productId={selectedProductId} onBack={handleBack} />
      )} */}
          {activeSection === "manage-products" && view==="manage" &&<ManageProducts onUpdateClick={handleUpdateClick} />}
          {activeSection === "manage-products" && view==="update" &&<UpdateProduct productId={selectedProductId} onBack={handleBack} />}
          {activeSection === "order" && <Order />}
          {activeSection === "add-category" && <AddCategory />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
