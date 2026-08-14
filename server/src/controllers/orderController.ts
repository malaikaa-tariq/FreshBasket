import type { Request, Response } from 'express';
import Cart from '../models/Cart.js';
import Order, { type OrderStatus } from '../models/Order.js';
import Product from '../models/Product.js';

export async function createOrder(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  const { deliveryAddress, paymentMethod = 'cash-on-delivery' } = req.body;

  if (!deliveryAddress) {
    return void res.status(400).json({ message: 'Delivery address is required' });
  }

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || !cart.items.length) {
    return void res.status(400).json({ message: 'Cart is empty' });
  }

  let subtotal = 0;
  const items: any[] = [];

  for (const item of cart.items as any) {
    const product = item.product;

    if (product.stock < item.quantity) {
      return void res.status(409).json({ message: `Not enough stock for ${product.name}` });
    }

    subtotal += product.price * item.quantity;
    items.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const deliveryFee = subtotal >= 3000 ? 0 : 150;
  const order = await Order.create({
    user: userId,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    deliveryAddress,
    paymentMethod,
  });

  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  }

  cart.items = [];
  await cart.save();
  res.status(201).json(order);
}

export async function myOrders(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  res.json(await Order.find({ user: userId }).sort({ createdAt: -1 }));
}

export async function allOrders(_req: Request, res: Response) {
  res.json(await Order.find().populate('user', 'name email').sort({ createdAt: -1 }));
}

export async function updateStatus(req: Request, res: Response) {
  const orderId = String(req.params.id);
  const allowed: OrderStatus[] = [
    'pending',
    'confirmed',
    'packed',
    'out-for-delivery',
    'delivered',
    'cancelled',
  ];

  if (!allowed.includes(req.body.status)) {
    return void res.status(400).json({ message: 'Invalid status' });
  }

  const order = await Order.findByIdAndUpdate(orderId, { status: req.body.status }, { new: true });
  if (!order) {
    return void res.status(404).json({ message: 'Order not found' });
  }

  res.json(order);
}
