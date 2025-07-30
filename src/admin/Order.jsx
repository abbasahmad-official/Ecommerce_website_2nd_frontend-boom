import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import "../css/Order.css"; // custom CSS file you'll create

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const { user, token } = isAuthenticated();

    
    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log("status update failed");
            } else {
                setStatusValues(data);
            }
        });
    };


    const showOrdersLength = () =>
        orders.length > 0 ? (
            <h2 className="orders-title">Total orders: {orders.length}</h2>
        ) : (
            <h2 className="orders-title">No orders</h2>
        );

    const showInput = (key, value) => (
        <div className="input-row">
            <span className="input-label">{key}:</span>
            <input type="text" value={value} readOnly className="readonly-input" />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if (data.error) {
                console.log("update order status failed");
            } else {
                loadOrders();
            }
        });
    };

    const showStatus = o => (
        <div className="status-box">
            <h4>Status: {o.status}</h4>
            <select onChange={e => handleStatusChange(e, o._id)}>
                <option>Update status</option>
                {statusValues.map((status, i) => (
                    <option key={i} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
    
            <div className="orders-container">
                {showOrdersLength()}
                {/* <p>{JSON.stringify(orders)}</p> */}
                {orders && orders.length>0 && orders.map((o, i) => (
                    <div className="order-card" key={i}>
                        <h2 className="order-id">Order ID: {o._id}</h2>

                        <div className="order-details">
                            {showStatus(o)}
                            <p>Transaction ID: {o.transaction_id}</p>
                            <p>Amount: { o.amount}</p>
                            <p>Ordered by: {o.full_name || "unknown"}</p>
                            <p>Ordered on: {moment(o.createdAt).fromNow()}</p>
                            <p>Delivery Address: {o.address}</p>
                        </div>

                        <h4>Total products: {o.products.length}</h4>
                        
                        {o.products.map((p, pindex) => (
                            <div className="product-card" key={pindex}>
                                {showInput("Product name", p.name)}
                                {showInput("Product price", p.price)}
                                {showInput("Quantity", p.count)}
                                {showInput("Product ID", p._id)}
                            </div>
                        ))}
                    </div>
                ))}
            
            </div>
        
    );
};

export default Orders;
