import { useEffect, useState, type FormEvent } from 'react';
import api from '../api/client';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCart, removeCartItem, updateCartItem } from '../redux/slices/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => { if (user) dispatch(fetchCart()); }, [dispatch, user]);
  if (!user) return <section className="page-wrap"><div className="empty-state">Login to view and manage your cart.</div></section>;
  const checkout = async (e: FormEvent) => { e.preventDefault(); if (!cart?.items.length) return; await api.post('/orders', { deliveryAddress: address, paymentMethod: 'cash-on-delivery' }); await dispatch(fetchCart()); setAddress(''); setMessage('Order placed successfully.'); };
  return <section className="page-wrap"><div className="page-heading"><div><span className="eyebrow">Your basket</span><h1>Cart</h1></div></div>{message && <div className="notice">{message}</div>}<div className="cart-layout"><div className="cart-list">{cart?.items.map((item) => <div className="cart-item" key={item.product._id}><img src={item.product.image}/><div><h3>{item.product.name}</h3><span>Rs. {item.product.price.toLocaleString()} / {item.product.unit}</span></div><input type="number" min="1" max={item.product.stock} value={item.quantity} onChange={(e)=>dispatch(updateCartItem({productId:item.product._id,quantity:Number(e.target.value)}))}/><strong>Rs. {(item.product.price*item.quantity).toLocaleString()}</strong><button className="danger-link" onClick={()=>dispatch(removeCartItem(item.product._id))}>Remove</button></div>)}{!cart?.items.length && <div className="empty-state">Your cart is empty.</div>}</div><form className="summary-card" onSubmit={checkout}><h2>Order summary</h2><div><span>Subtotal</span><strong>Rs. {(cart?.subtotal ?? 0).toLocaleString()}</strong></div><label>Delivery address<textarea required value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="House, street, area, city"/></label><button className="primary-btn" disabled={loading || !cart?.items.length}>Place order</button></form></div></section>;
}
