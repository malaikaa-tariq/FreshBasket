import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { register } from '../redux/slices/authSlice';

export default function RegisterPage() {
  const dispatch = useAppDispatch(); const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const submit = async (e: FormEvent) => { e.preventDefault(); const result = await dispatch(register(form)); if (register.fulfilled.match(result)) navigate('/products'); };
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}><span className="eyebrow">New customer</span><h1>Create account</h1><label>Name<input required value={form.name} onChange={(e) => setForm({...form, name:e.target.value})}/></label><label>Email<input type="email" required value={form.email} onChange={(e) => setForm({...form, email:e.target.value})}/></label><label>Password<input type="password" minLength={6} required value={form.password} onChange={(e) => setForm({...form, password:e.target.value})}/></label>{error && <div className="error-box">{error}</div>}<button className="primary-btn" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button><p>Already registered? <Link to="/login">Login</Link></p></form></section>;
}
