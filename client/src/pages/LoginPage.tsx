import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login } from '../redux/slices/authSlice';
import { fetchCart } from '../redux/slices/cartSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) { await dispatch(fetchCart()); navigate('/products'); }
  };

  return <section className="auth-page"><form className="auth-card" onSubmit={submit}><span className="eyebrow">Welcome back</span><h1>Login</h1><label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/></label><label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/></label>{error && <div className="error-box">{error}</div>}<button className="primary-btn" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button><p>New here? <Link to="/register">Create an account</Link></p></form></section>;
}
