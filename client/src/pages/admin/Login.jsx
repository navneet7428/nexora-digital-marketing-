import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm]     = useState({ username: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { token, username } = await adminLogin(form);
      login(token, username);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '48px 40px' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>ADMIN ACCESS</p>
        <h1 style={{ fontFamily: 'var(--heading)', fontSize: '32px', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: '40px' }}>NEXORA Control</h1>

        <form onSubmit={handleSubmit}>
          {[['username','Username','text'],['password','Password','password']].map(([field, label, type]) => (
            <div key={field} style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</label>
              <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required
                style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', fontFamily: 'var(--body-font)', fontSize: '15px', padding: '12px 16px', outline: 'none', transition: 'border-color .2s' }}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
              />
            </div>
          ))}
          {error && <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: '#ff6666', marginBottom: '20px' }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}>
            {loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM →'}
          </button>
        </form>
      </div>
    </div>
  );
}
