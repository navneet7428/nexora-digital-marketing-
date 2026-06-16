import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;

    const onMove = e => {
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
    };

    const onOver = e => {
      const t = e.target;
      if (t.matches('a,button,[role=button],input,textarea,select,label,.cursor-hover'))
        el.className = 'cursor hover';
      else if (t.matches('p,h1,h2,h3,h4,h5,h6,span,li'))
        el.className = 'cursor text';
      else
        el.className = 'cursor';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <style>{`
        .cursor {
          position: fixed; top: 0; left: 0; width: 8px; height: 8px;
          border-radius: 50%; background: #00D9FF; pointer-events: none;
          z-index: 99999; transform: translate(-50%,-50%);
          transition: width .2s, height .2s, background .2s, border-radius .2s, border .2s;
          mix-blend-mode: screen;
        }
        .cursor.hover {
          width: 40px; height: 40px; background: transparent;
          border: 1.5px solid #00D9FF;
          animation: cspin 3s linear infinite;
        }
        .cursor.text { width: 2px; height: 20px; border-radius: 1px; }
        @keyframes cspin { to { transform: translate(-50%,-50%) rotate(360deg); } }
      `}</style>
    </>
  );
}
