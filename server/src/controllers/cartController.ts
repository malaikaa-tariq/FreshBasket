import type { Request, Response } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

async function populated(userId: string) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  if (!cart.populated('items.product')) {
    await cart.populate('items.product');
  }

  const raw = cart.toObject() as any;
  raw.subtotal = raw.items.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );

  return raw;
}

export async function getCart(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  res.json(await populated(userId));
}

export async function addItem(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    return void res.status(404).json({ message: 'Product not found' });
  }

  if (quantity < 1 || quantity > product.stock) {
    return void res.status(400).json({ message: 'Invalid quantity' });
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existing = cart.items.find((item) => item.product.toString() === productId);

  if (existing) {
    if (existing.quantity + quantity > product.stock) {
      return void res.status(400).json({ message: 'Quantity exceeds stock' });
    }
    existing.quantity += quantity;
  } else {
    cart.items.push({ product: product._id, quantity });
  }

  await cart.save();
  res.json(await populated(userId));
}

export async function updateItem(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  const productId = String(req.params.productId);
  const quantity = Number(req.body.quantity);
  const product = await Product.findById(productId);

  if (!product) {
    return void res.status(404).json({ message: 'Product not found' });
  }

  if (quantity < 1 || quantity > product.stock) {
    return void res.status(400).json({ message: 'Invalid quantity' });
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return void res.status(404).json({ message: 'Cart not found' });
  }

  const item = cart.items.find((cartItem) => cartItem.product.toString() === productId);
  if (!item) {
    return void res.status(404).json({ message: 'Cart item not found' });
  }

  item.quantity = quantity;
  await cart.save();
  res.json(await populated(userId));
}

export async function removeItem(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  const productId = String(req.params.productId);
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return void res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== productId) as any;
  await cart.save();
  res.json(await populated(userId));
}
