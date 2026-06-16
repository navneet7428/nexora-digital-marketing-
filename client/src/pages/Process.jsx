import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: '01', title: 'Intelligence Audit',  desc: 'Full-spectrum analysis of your digital presence, competitors, and market gaps. We build an intelligence map before writing a single line of copy.', detail: '72-hour deep dive. No fluff. Pure signal.' },
  { number: '02', title: 'Signal Mapping',       desc: 'We identify every touchpoint where your audience exists, how they behave, and what messages cut through the noise in your specific market.',     detail: 'Data-driven positioning across all channels.' },
  { number: '03', title: 'System Architecture',  desc: 'Strategy becomes structure. We architect the full marketing system — content, distribution, conversion, and feedback loops — before executing.', detail: 'Blueprint reviewed and approved by you.' },
  { number: '04', title: 'Mission Deployment',   desc: 'Launch with precision. Every campaign, every piece of content, every paid ad is deployed with purpose and tracked from day one.',               detail: 'Live within 14 business days.' },
  { number: '05', title: 'Optimization Loop',    desc: 'Our AI monitors performance 24/7. Winners are amplified. Losers are cut. The system evolves in real time, not quarterly.',                      detail: 'Weekly performance dispatches.' },
  { number: '06', title: 'Scale Protocol',       desc: 'Once the machine is running, we scale it. More channels, more markets, more reach — with the same precision that built the original foundation.', detail: 'Compounding growth at every stage.' },
];

function NetworkCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 500, H = 400;
    canvas.width = W; canvas.height = H;
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: 2 + Math.random() * 3
    }));
    let frame;
    function draw() {
      frame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#080C20'; ctx.fillRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,217,255,${.15 * (1 - dist / 100)})`; ctx.lineWidth = .5; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = '#00D9FF'; ctx.globalAlpha = .7; ctx.fill(); ctx.globalAlpha = 1; });
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={ref} style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)' }} />;
}

export default function Process() {
  const navigate  = useNavigate();
  const container = useRef(null);
  const track     = useRef(null);
  const fill      = useRef(null);
  const dots      = useRef([]);

  useEffect(() => {
    const scrollEl   = container.current;
    const trackEl    = track.current;
    const fillEl     = fill.current;
    if (!scrollEl || !trackEl || !fillEl) return;

    const cardWidth  = window.innerWidth * 0.8;
    const totalSlide = cardWidth * (steps.length - 1);

    const onScroll = () => {
      const rect            = scrollEl.getBoundingClientRect();
      const totalScrollable = scrollEl.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      trackEl.style.transform = `translateX(${-(p * totalSlide)}px)`;
      fillEl.style.width      = (p * 100) + '%';
      const activeIdx = Math.min(steps.length - 1, Math.floor(p * steps.length));
      dots.current.forEach((d, i) => {
        if (d) d.style.color = i === activeIdx ? 'var(--blue)' : 'var(--muted)';
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    gsap.fromTo('.proc-header', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.fromTo('.proc-after', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.proc-after', start: 'top 80%' } });

    return () => {
      window.removeEventListener('scroll', onScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <section style={{ padding: '180px 80px 100px', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 0%,rgba(139,92,246,.06) 0%,transparent 60%)' }} />
        <div className="proc-header" style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow">METHODOLOGY / SYSTEM</p>
          <h1 style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.05, maxWidth: '700px' }}>
            Six steps to total dominance.
          </h1>
        </div>
      </section>

      {/* HORIZONTAL SCROLL */}
      <div ref={container} style={{ height: '600vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div ref={track} style={{ display: 'flex', width: 'max-content', gap: 0, transition: 'none' }}>
              {steps.map((s, i) => (
                <div key={i} style={{ width: '80vw', flexShrink: 0, paddingRight: '60px' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '120px', fontWeight: 700, color: 'rgba(255,255,255,.04)', lineHeight: 1, marginBottom: '-20px' }}>{s.number}</p>
                  <h2 style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '20px' }}>{s.title}</h2>
                  <p style={{ fontFamily: 'var(--body-font)', fontSize: '18px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '20px' }}>{s.desc}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--blue)', letterSpacing: '1px' }}>{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div style={{ position: 'absolute', bottom: '60px', left: '80px', right: '80px' }}>
            <div style={{ height: '1px', background: 'var(--glass-border)', position: 'relative' }}>
              <div ref={fill} style={{ height: '1px', background: 'var(--blue)', width: '0%', boxShadow: '0 0 8px var(--blue)', transition: 'none' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
              {steps.map((s, i) => (
                <span key={i} ref={el => dots.current[i] = el} style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color .3s' }}>
                  {s.number}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AFTER SCROLL */}
      <div className="proc-after" style={{ padding: '100px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <p className="eyebrow">THE OUTCOME</p>
            <h2 className="section-title" style={{ maxWidth: '460px', marginBottom: '24px' }}>A machine that runs itself.</h2>
            <p style={{ fontFamily: 'var(--body-font)', fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '36px' }}>
              By the end of our six-step process, you don't just have a campaign — you have a growth engine. One that learns, adapts, and compounds with every impression.
            </p>
            <button className="btn-primary" onClick={() => navigate('/contact')}>START THE PROCESS →</button>
          </div>
          <NetworkCanvas />
        </div>
      </div>
    </>
  );
}
