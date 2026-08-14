import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../types';

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: (id: string) => void }) {
  const category = typeof product.category === 'string' ? 'Grocery' : product.category.name;

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.featured && <span className="product-badge">Featured</span>}
      </div>
      <div className="product-body">
        <div className="product-kicker-row">
          <span>{category}</span>
          <span className="rating"><Star size={13} fill="currentColor" /> {product.averageRating?.toFixed(1) ?? '4.8'}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <div className="product-price">
            <strong>Rs. {product.price.toLocaleString()}</strong>
            <span>{product.unit}</span>
          </div>
          <button className="add-icon-btn" disabled={product.stock < 1} onClick={() => onAdd(product._id)} aria-label={`Add ${product.name} to cart`}>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
