import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { submitContact } from '../utils/api';

const budgets = ['$5K–$15K', '$15K–$50K', '$50K–$150K', '$150K+'];

export default function Contact() {
  const [form,     setForm]     = useState({ name: '', email: '', company: '', message: '' });
  const [budget,   setBudget]   = useState('');
  const [focused,  setFocused]  = useState('');
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.company.trim()) e.company = 'Company is required';
    if (form.message.trim().length < 10) e.message = 'Please tell us more (min 10 characters)';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setApiError('');
    try {
      await submitContact({ ...form, budget });
      setSuccess(true);
    } catch (err) {
      setApiError(err.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      gsap.fromTo('.success-content > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: .15, duration: .8, ease: 'power3.out' });
    }
  }, [success]);

  const inputStyle = (field) => ({
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focused === field ? 'var(--blue)' : errors[field] ? '#ff4444' : 'var(--glass-border)'}`,
    color: '#fff', fontFamily: 'var(--body-font)', fontSize: '16px',
    padding: '16px 0 12px', outline: 'none', transition: 'border-color .2s',
    boxShadow: focused === field ? '0 2px 12px rgba(0,217,255,.15)' : 'none',
  });

  const labelStyle = (field) => ({
    position: 'absolute', left: 0,
    top: focused === field || form[field] ? '-8px' : '16px',
    fontFamily: 'var(--body-font)',
    fontSize: focused === field || form[field] ? '11px' : '14px',
    letterSpacing: focused === field || form[field] ? '2px' : 0,
    textTransform: focused === field || form[field] ? 'uppercase' : 'none',
    color: errors[field] ? '#ff4444' : focused === field || form[field] ? 'var(--blue)' : 'var(--muted)',
    transition: 'all .2s', pointerEvents: 'none',
  });

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
        <div className="success-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00D9FF" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
          </svg>
          <p className="eyebrow">TRANSMISSION RECEIVED</p>
          <h2 style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px' }}>Mission initiated.</h2>
          <p style={{ fontFamily: 'var(--body-font)', fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '480px' }}>
            Our team will analyze your brief and respond within 24 hours with a custom strategy outline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section style={{ padding: '160px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(0,217,255,.05) 0%, transparent 60%)' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p className="eyebrow">CONTACT / ENGAGE</p>
        <h1 style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(48px,8vw,72px)', fontWeight: 700, color: '#fff', letterSpacing: '-2.5px', textAlign: 'center', lineHeight: 1, marginBottom: '20px' }}>
          READY TO DOMINATE?
        </h1>
        <p style={{ fontFamily: 'var(--body-font)', fontSize: '16px', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.7, maxWidth: '480px', marginBottom: '72px' }}>
          Tell us about your mission. We'll respond with a custom growth strategy within 24 hours.
        </p>

        <div className="glass-card" style={{ width: '100%', maxWidth: '680px', padding: '56px 60px' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
              {[['name','Full Name'],['email','Email Address']].map(([field, label]) => (
                <div key={field} style={{ position: 'relative', marginBottom: '40px' }}>
                  <label style={labelStyle(field)}>{label}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    style={inputStyle(field)}
                    value={form[field]}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused('')}
                    onChange={e => { setForm(f => ({ ...f, [field]: e.target.value })); if (errors[field]) setErrors(er => ({ ...er, [field]: '' })); }}
                  />
                  {errors[field] && <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#ff4444', marginTop: '4px', display: 'block' }}>{errors[field]}</span>}
                </div>
              ))}
            </div>

            <div style={{ position: 'relative', marginBottom: '40px' }}>
              <label style={labelStyle('company')}>Company / Brand</label>
              <input
                type="text"
                style={inputStyle('company')}
                value={form.company}
                onFocus={() => setFocused('company')}
                onBlur={() => setFocused('')}
                onChange={e => { setForm(f => ({ ...f, company: e.target.value })); if (errors.company) setErrors(er => ({ ...er, company: '' })); }}
              />
              {errors.company && <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#ff4444', marginTop: '4px', display: 'block' }}>{errors.company}</span>}
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Monthly Budget</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {budgets.map(b => (
                <button key={b} type="button" onClick={() => setBudget(b === budget ? '' : b)}
                  style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: budget === b ? '#000' : 'var(--muted)', background: budget === b ? 'var(--blue)' : 'transparent', border: `1px solid ${budget === b ? 'var(--blue)' : 'var(--glass-border)'}`, padding: '8px 18px', borderRadius: '4px', cursor: 'none', letterSpacing: '1px', transition: 'all .2s' }}>
                  {b}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', marginBottom: '40px' }}>
              <label style={labelStyle('message')}>Project Brief</label>
              <textarea
                rows={4}
                style={{ ...inputStyle('message'), resize: 'none', display: 'block', paddingTop: '20px' }}
                value={form.message}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                onChange={e => { setForm(f => ({ ...f, message: e.target.value })); if (errors.message) setErrors(er => ({ ...er, message: '' })); }}
              />
              {errors.message && <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#ff4444', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
            </div>

            {apiError && (
              <div style={{ background: 'rgba(255,68,68,.1)', border: '1px solid rgba(255,68,68,.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', fontFamily: 'var(--mono)', fontSize: '12px', color: '#ff6666' }}>
                {apiError}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', fontFamily: 'var(--body-font)', fontSize: '14px', fontWeight: 600, color: '#000', background: loading ? 'rgba(255,122,0,.6)' : 'var(--orange)', padding: '16px 32px', borderRadius: '4px', border: 'none', cursor: 'none', letterSpacing: '.08em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'box-shadow .2s' }}>
              {loading ? '[ TRANSMITTING... ]' : 'LAUNCH THE MISSION →'}
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', gap: '60px', marginTop: '72px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['EMAIL','engage@nexora.ai'],['RESPONSE TIME','< 24 hours'],['TIMEZONE','Global Coverage']].map(([label, val]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>
              <p style={{ fontFamily: 'var(--body-font)', fontSize: '16px', color: '#fff' }}>{val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
