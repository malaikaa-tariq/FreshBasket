import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AdminRoute, ProtectedRoute } from './components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchCart } from './redux/slices/cartSlice';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';

function AppRoutes(){
  const dispatch=useAppDispatch(); const {user}=useAppSelector(s=>s.auth);
  useEffect(()=>{if(user) dispatch(fetchCart())},[dispatch,user]);
  return <Layout><Routes><Route path="/" element={<HomePage/>}/><Route path="/products" element={<ProductsPage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/orders" element={<ProtectedRoute><OrdersPage/></ProtectedRoute>}/><Route path="/admin" element={<AdminRoute><AdminPage/></AdminRoute>}/><Route path="*" element={<section className="page-wrap"><div className="empty-state">Page not found.</div></section>}/></Routes></Layout>
}
export default function App(){return <BrowserRouter><AppRoutes/></BrowserRouter>}
