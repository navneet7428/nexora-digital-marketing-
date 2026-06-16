import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ padding: '60px 80px', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
      <div style={{ fontFamily: 'var(--heading)', fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '-.5px' }}>
        NEXORA<span style={{ color: 'var(--blue)' }}>.</span>
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        {[['Home','/'],['Services','/services'],['Process','/process'],['Contact','/contact']].map(([label, path]) => (
          <button key={label} onClick={() => navigate(path)}
            style={{ fontFamily: 'var(--body-font)', fontSize: '13px', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'none', transition: 'color .2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--blue)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{label}</button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '1px' }}>
        © {new Date().getFullYear()} NEXORA. All rights reserved.
      </p>
    </footer>
  );
}
