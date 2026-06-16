import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from '../components/HeroCanvas';
import ServiceCard from '../components/ServiceCard';
import StatCounter from '../components/StatCounter';
import Marquee from '../components/Marquee';
import { useFetch } from '../hooks/useFetch';
import { fetchServices, fetchCases, fetchStats } from '../utils/api';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const heroRef  = useRef(null);
  const storyRef = useRef(null);

  const { data: services } = useFetch(fetchServices);
  const { data: cases }    = useFetch(fetchCases);
  const { data: stats }    = useFetch(fetchStats);

  // Hero entrance
  useEffect(() => {
    gsap.set(['.h-eyebrow','.h-title','.h-sub','.h-btns'], { y: 30, opacity: 0 });
    gsap.timeline({ delay: 0.3 })
      .to('.h-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.h-title',   { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.5')
      .to('.h-sub',     { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.h-btns',    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  }, []);

  // Scroll story
  useEffect(() => {
    const lines = document.querySelectorAll('.story-line');
    lines.forEach((line, i) => {
      const start = (i / 3) * 100;
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: `${start}% top`,
        end: `${((i + 1) / 3) * 100 - 5}% top`,
        scrub: true,
        onUpdate: self => {
          const p = self.progress;
          gsap.set(line, { opacity: Math.sin(p * Math.PI), y: (1 - p) * 20 });
        }
      });
    });
    gsap.fromTo('.cta-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '#cta-banner', start: 'top 80%' } });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', position: 'relative', overflow: 'hidden' }}>
        <HeroCanvas />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p className="h-eyebrow" style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--blue)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '32px' }}>
            [ SYSTEM ONLINE — 2035 ]
          </p>
          <h1 className="h-title" style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(56px,10vw,96px)', fontWeight: 700, color: '#fff', letterSpacing: '-3px', lineHeight: .95, marginBottom: '32px' }}>
            NEXORA
          </h1>
          <p className="h-sub" style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(16px,2.5vw,22px)', fontWeight: 400, color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.5, marginBottom: '52px' }}>
            We don't market brands. <span style={{ color: 'var(--body)' }}>We engineer digital dominance.</span>
          </p>
          <div className="h-btns" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => navigate('/contact')}>START A PROJECT →</button>
            <button className="btn-secondary" onClick={() => navigate('/services')}>EXPLORE SERVICES</button>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: .4, zIndex: 2 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px' }}>SCROLL</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
        </div>
      </section>

      {/* SCROLL STORY */}
      <div ref={storyRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,.06) 0%, transparent 60%)' }} />
          {['Every click creates data.','Every data point creates opportunity.','Every opportunity creates growth.'].map((line, i) => (
            <p key={i} className="story-line" style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', opacity: 0, position: 'absolute', width: '100%', textAlign: 'center', padding: '0 40px' }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <section style={{ padding: '120px 80px' }}>
        <div className="section-inner">
          <div style={{ marginBottom: '72px' }}>
            <p className="eyebrow">CAPABILITIES</p>
            <h2 className="section-title" style={{ maxWidth: '560px' }}>The full-stack intelligence platform.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px,1fr))', gap: '24px' }}>
            {services
              ? services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)
              : Array(6).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '240px', borderRadius: '12px' }} />)
            }
          </div>
        </div>
      </section>

      {/* STATS + CASE STUDIES */}
      <section style={{ padding: '100px 80px', background: 'var(--surface)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="section-inner">
          <p className="eyebrow">RESULTS</p>
          <h2 className="section-title" style={{ marginBottom: '72px' }}>Numbers that move markets.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '40px', marginBottom: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--glass-border)' }}>
            {stats
              ? stats.map(s => <StatCounter key={s.id} {...s} />)
              : Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '100px' }} />)
            }
          </div>

          <p className="eyebrow" style={{ marginBottom: '40px' }}>CASE STUDIES</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {cases
              ? cases.map(c => (
                <div key={c.id} className="glass-card" style={{ padding: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--heading)', fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{c.client}</p>
                      <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>{c.industry}</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '52px', fontWeight: 700, lineHeight: 1, marginBottom: '6px', color: c.color, textShadow: `0 0 30px ${c.color}40` }}>{c.result}</p>
                  <p style={{ fontFamily: 'var(--body-font)', fontSize: '13px', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>{c.metric}</p>
                  <p style={{ fontFamily: 'var(--body-font)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{c.detail}</p>
                </div>
              ))
              : Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '260px', borderRadius: '12px' }} />)
            }
          </div>
        </div>
      </section>

      <Marquee />

      {/* CTA BANNER */}
      <section id="cta-banner" style={{ padding: '160px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,122,0,.06) 0%, transparent 70%)' }} />
        <p className="eyebrow" style={{ position: 'relative', zIndex: 1 }}>INITIATE SEQUENCE</p>
        <h2 className="cta-title" style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: '#fff', letterSpacing: '-2px', marginBottom: '48px', lineHeight: 1, position: 'relative', zIndex: 1 }}>
          Ready to dominate?
        </h2>
        <button className="btn-primary" onClick={() => navigate('/contact')} style={{ fontSize: '15px', padding: '16px 48px', position: 'relative', zIndex: 1 }}>
          ENGAGE NEXORA →
        </button>
      </section>
    </>
  );
}
