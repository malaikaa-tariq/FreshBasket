import { ArrowRight, Clock3, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Fresh Produce',
    text: 'Fruits and vegetables selected for everyday freshness.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=82'
  },
  {
    name: 'Bakery',
    text: 'Bread and baked staples for breakfast and family meals.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=82'
  },
  {
    name: 'Dairy & Eggs',
    text: 'Milk, eggs and daily essentials kept simple and fresh.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=82'
  },
  {
    name: 'Pantry',
    text: 'Reliable cupboard staples for quick everyday cooking.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=82'
  }
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-photo" aria-hidden="true" />
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <span className="eyebrow light">Fresh groceries, delivered simply</span>
          <h1>Better groceries.<br />Less supermarket.</h1>
          <p>
            Shop fresh produce, bakery, dairy and pantry essentials from one clean storefront,
            then follow your order from basket to delivery.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="primary-btn hero-primary">
              Shop groceries <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="secondary-btn hero-secondary">Create account</Link>
          </div>
        </div>
        <div className="hero-offer">
          <span>THIS WEEK</span>
          <strong>Fresh picks<br />for every basket</strong>
          <small>Produce • Dairy • Pantry • Bakery</small>
        </div>
      </section>

      <section className="service-bar" aria-label="Store benefits">
        <div><Leaf size={20} /><span><strong>Fresh selection</strong><small>Everyday grocery essentials</small></span></div>
        <div><Clock3 size={20} /><span><strong>Quick ordering</strong><small>A simple cart and checkout flow</small></span></div>
        <div><ShieldCheck size={20} /><span><strong>Secure account</strong><small>Protected customer access</small></span></div>
        <div><Truck size={20} /><span><strong>Order tracking</strong><small>Follow delivery status clearly</small></span></div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2>Everything you need for the week.</h2>
          </div>
          <Link to="/products" className="text-link">View all groceries <ArrowRight size={17} /></Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link to="/products" className="category-card" key={category.name}>
              <img src={category.image} alt={category.name} />
              <div className="category-card-overlay" />
              <div className="category-card-copy">
                <h3>{category.name}</h3>
                <p>{category.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="eyebrow">FreshBasket</span>
          <h2>One basket. One checkout. A cleaner grocery routine.</h2>
        </div>
        <Link to="/products" className="primary-btn">Start shopping <ArrowRight size={18} /></Link>
      </section>
    </>
  );
}
