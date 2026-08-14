import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Review from '../models/Review.js';
import Product from '../models/Product.js';

async function refresh(productId: string) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return;
  }

  const rows = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: '$product', avg: { $avg: '$rating' } } },
  ]);

  await Product.findByIdAndUpdate(productId, { averageRating: rows[0]?.avg || 0 });
}

export async function listReviews(req: Request, res: Response) {
  const productId = String(req.params.productId);
  res.json(
    await Review.find({ product: productId }).populate('user', 'name').sort({ createdAt: -1 })
  );
}

export async function upsertReview(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  const productId = String(req.params.productId);
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5 || !comment) {
    return void res.status(400).json({ message: 'Rating 1-5 and comment are required' });
  }

  const review = await Review.findOneAndUpdate(
    { user: userId, product: productId },
    { rating, comment },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await refresh(productId);
  res.status(201).json(review);
}

export async function deleteReview(req: Request, res: Response) {
  const userId = req.user!._id.toString();
  const reviewId = String(req.params.id);

  const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
  if (!review) {
    return void res.status(404).json({ message: 'Review not found' });
  }

  await refresh(review.product.toString());
  res.status(204).send();
}
