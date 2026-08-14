import { Moon, ShoppingBasket, Sun } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { clearLocalCart } from '../redux/slices/cartSlice';

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const [dark, setDark] = useState(() => localStorage.getItem('freshbasket_theme') === 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('freshbasket_theme', dark ? 'dark' : 'light');
  }, [dark]);

  const signOut = () => {
    dispatch(logout());
    dispatch(clearLocalCart());
    navigate('/');
  };

  const count = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="FreshBasket home">
          <img src="/freshbasket-logo.png" alt="FreshBasket" className="brand-logo" />
          <div className="brand-copy">
            <span className="brand-name">FreshBasket</span>
            <span className="brand-subtitle">Fresh grocery store</span>
          </div>
        </Link>

        <nav className="center-nav" aria-label="Primary navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Groceries</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        </nav>

        <div className="header-actions">
          <button className="icon-btn" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          {user ? (
            <button className="ghost-btn" onClick={signOut}>Logout</button>
          ) : (
            <Link className="ghost-btn" to="/login">Login</Link>
          )}
          <Link className="cart-link" to="/cart">
            <ShoppingBasket size={17} />
            <span className="cart-label">Cart</span>
            <b>{count}</b>
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <strong>FreshBasket</strong>
          <span>Fresh groceries. Simple ordering. Reliable delivery.</span>
        </div>
        <span>© 2026 FreshBasket</span>
      </footer>
    </div>
  );
}
