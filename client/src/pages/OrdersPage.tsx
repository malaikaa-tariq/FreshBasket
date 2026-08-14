import { useEffect, useState } from 'react';
import api from '../api/client';
import type { Order } from '../types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { api.get('/orders/my').then(({data}) => setOrders(data)); }, []);
  return <section className="page-wrap"><div className="page-heading"><div><span className="eyebrow">Track purchases</span><h1>My orders</h1></div></div><div className="orders-grid">{orders.map((order)=><article className="order-card" key={order._id}><div className="order-top"><strong>#{order._id.slice(-6).toUpperCase()}</strong><span className="status-pill">{order.status}</span></div><p>{new Date(order.createdAt).toLocaleString()}</p><ul>{order.items.map((i,index)=><li key={index}><span>{i.name} × {i.quantity}</span><b>Rs. {(i.price*i.quantity).toLocaleString()}</b></li>)}</ul><div className="order-total"><span>Total</span><strong>Rs. {order.total.toLocaleString()}</strong></div></article>)}{!orders.length&&<div className="empty-state">No orders yet.</div>}</div></section>;
}
