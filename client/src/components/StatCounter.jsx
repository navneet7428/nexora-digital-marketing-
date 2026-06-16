import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function StatCounter({ value, prefix = '', suffix = '', label, decimals = 0 }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (fired.current) return;
        fired.current = true;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: value, duration: 2.2, ease: 'power3.out',
          onUpdate: () => setDisplay(decimals ? obj.v.toFixed(decimals) : Math.floor(obj.v).toString())
        });
      }
    });

    return () => trigger.kill();
  }, [value, decimals]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(36px, 9vw, 64px)', fontWeight: 700, color: '#fff', lineHeight: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
        {prefix && <span style={{ color: 'var(--blue)', fontSize: 'clamp(20px, 4.5vw, 32px)' }}>{prefix}</span>}
        <span>{display}</span>
        {suffix && <span style={{ color: 'var(--blue)', fontSize: 'clamp(20px, 4.5vw, 32px)' }}>{suffix}</span>}
      </div>
      <p style={{ fontFamily: 'var(--body-font)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '12px' }}>{label}</p>
    </div>
  );
}