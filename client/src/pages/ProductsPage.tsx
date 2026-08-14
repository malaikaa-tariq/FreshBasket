import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart } from '../redux/slices/cartSlice';
import type { Category, Product } from '../types';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')]).then(([p, c]) => {
      setProducts(p.data.products);
      setCategories(c.data);
    });
  }, []);

  const filtered = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase());
    const categoryId = typeof product.category === 'string' ? product.category : product.category._id;
    return matchesSearch && (!category || categoryId === category);
  }), [products, search, category]);

  const handleAdd = async (id: string) => {
    if (!user) {
      setNotice('Please login before adding items to your cart.');
      return;
    }
    await dispatch(addToCart({ productId: id, quantity: 1 }));
    setNotice('Added to cart.');
    setTimeout(() => setNotice(''), 1800);
  };

  return (
    <section className="shop-page">
      <div className="shop-hero">
        <div className="shop-hero-copy">
          <span className="eyebrow">FreshBasket grocery store</span>
          <h1>Fresh food for everyday life.</h1>
          <p>Explore produce, bakery, dairy and pantry essentials in one simple grocery catalog.</p>
        </div>
        <div className="shop-hero-image" aria-hidden="true" />
      </div>

      <div className="shop-toolbar-wrap">
        <div className="category-tabs" aria-label="Product categories">
          <button className={!category ? 'active' : ''} onClick={() => setCategory('')}>All</button>
          {categories.map((item) => (
            <button
              key={item._id}
              className={category === item._id ? 'active' : ''}
              onClick={() => setCategory(item._id)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="shop-toolbar">
          <label className="search-box">
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search groceries" />
          </label>
          <div className="result-count"><SlidersHorizontal size={17} /> {filtered.length} products</div>
        </div>
      </div>

      {notice && <div className="notice shop-notice">{notice}</div>}

      <div className="shop-content">
        <div className="shop-heading-row">
          <div>
            <span className="eyebrow">Food store</span>
            <h2>{category ? categories.find((item) => item._id === category)?.name ?? 'Groceries' : 'All groceries'}</h2>
          </div>
          <p>Fresh basics and pantry staples for everyday shopping.</p>
        </div>

        <div className="product-grid">
          {filtered.map((product) => <ProductCard key={product._id} product={product} onAdd={handleAdd} />)}
        </div>
        {!filtered.length && <div className="empty-state">No groceries match your filters.</div>}
      </div>
    </section>
  );
}
