import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ICONS = {
  'trending-up': <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  'zap':         <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  'layers':      <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  'globe':       <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  'bar-chart':   <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  'code':        <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
};

function Icon({ name, size = 28, color = '#00D9FF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name] || null}
    </svg>
  );
}

export { Icon };

export default function ServiceCard({ service, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already visible in viewport (above fold)
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight;

    if (inView) {
      // Animate immediately with stagger delay
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: index * 0.08 }
      );
    } else {
      // Animate on scroll
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    }
  }, [index]);

  return (
    <div
      ref={ref}
      className="glass-card"
      style={{ padding: '36px', opacity: 0 }}
    >
      <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '28px', display: 'block' }}>
        {service.tag}
      </span>
      <div style={{ marginBottom: '20px' }}>
        <Icon name={service.icon} />
      </div>
      <h3 style={{ fontFamily: 'var(--heading)', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-.3px', marginBottom: '12px' }}>
        {service.title}
      </h3>
      <p style={{ fontFamily: 'var(--body-font)', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
        {service.description}
      </p>
    </div>
  );
}
