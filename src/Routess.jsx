import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './Home'
import Navbar from './Menu/Navbar';
import Footer from './Footer';
import Cart from './Cart';
import ProductView from './ProductView';
import Shop from './Shop';
import Search from './SearchResults';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/Dashboard';
import AdminDashboard from './admin/AdminDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Profile from './user/Profile';
import ProductsByCategory from './ProductsByCategory';
import Success from './Success';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Routess = () => {
  return (
    <BrowserRouter>
           <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product/:productId' element={<ProductView />} />
            <Route path='/category/:categoryId' element={<ProductsByCategory />} />
            <Route path='/success' element={<Success />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/search' element={<Search />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signin' element={<Signin />} />
            <Route path="/user/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute> } />
            <Route path="/profile/:userId" element={<PrivateRoute><Profile /></PrivateRoute> } />
            <Route path="/admin/dashboard" element={ <AdminRoute> <AdminDashboard/> </AdminRoute>} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  )
    
}

export default Routess
