import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFetch } from '../hooks/useFetch';
import { fetchServices } from '../utils/api';
gsap.registerPlugin(ScrollTrigger);

// ── THREE.JS SERVICE CANVAS ──
function ServiceCanvas({ index }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const W = canvas.parentElement?.clientWidth || 500;
    const H = 380;

    const scene    = new THREE.Scene();
    const cam      = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    cam.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    let animFrame;
    const t = { v: 0 };
    const type = index % 4;

    if (type === 0) {
      // AI Brain — icosahedron + orbiting dots
      const geo  = new THREE.IcosahedronGeometry(1.5, 2);
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x00D9FF, wireframe: true, opacity: 0.2, transparent: true }));
      scene.add(mesh);
      const orbit = new THREE.Group();
      for (let i = 0; i < 40; i++) {
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: 0x00D9FF }));
        const phi = Math.acos(2 * Math.random() - 1), theta = Math.random() * Math.PI * 2;
        const r = 1.6 + Math.random() * 0.8;
        d.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
        orbit.add(d);
      }
      scene.add(orbit);
      const anim = () => { animFrame = requestAnimationFrame(anim); t.v += 0.008; mesh.rotation.y = t.v; mesh.rotation.x = t.v * 0.3; orbit.rotation.y = -t.v * 0.5; renderer.render(scene, cam); };
      anim();

    } else if (type === 1) {
      // Globe with latitude rings
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0x00D9FF, wireframe: true, opacity: 0.15, transparent: true }));
      scene.add(mesh);
      for (let i = -3; i <= 3; i++) {
        const y = i * 0.5, r = Math.sqrt(Math.max(0, 2.25 - y * y));
        const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.005, r + 0.005, 64), new THREE.MeshBasicMaterial({ color: 0x8B5CF6, side: THREE.DoubleSide, opacity: 0.3, transparent: true }));
        ring.position.y = y; ring.rotation.x = Math.PI / 2; scene.add(ring);
      }
      const anim = () => { animFrame = requestAnimationFrame(anim); t.v += 0.005; mesh.rotation.y = t.v; renderer.render(scene, cam); };
      anim();

    } else if (type === 2) {
      // Colored particle cloud
      const pCount = 2000;
      const pGeo   = new THREE.BufferGeometry();
      const pos    = new Float32Array(pCount * 3);
      const cols   = new Float32Array(pCount * 3);
      const palette = [[0, 0.85, 1], [0.54, 0.36, 0.96], [1, 0.48, 0]];
      for (let i = 0; i < pCount; i++) {
        pos[i*3]   = (Math.random()-0.5)*8; pos[i*3+1] = (Math.random()-0.5)*8; pos[i*3+2] = (Math.random()-0.5)*8;
        const c = palette[Math.floor(Math.random()*3)];
        cols[i*3] = c[0]; cols[i*3+1] = c[1]; cols[i*3+2] = c[2];
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('color',    new THREE.BufferAttribute(cols, 3));
      const mesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.8 }));
      scene.add(mesh);
      const anim = () => { animFrame = requestAnimationFrame(anim); t.v += 0.003; mesh.rotation.y = t.v; mesh.rotation.x = t.v * 0.4; renderer.render(scene, cam); };
      anim();

    } else {
      // Data flow lines
      cam.position.z = 5;
      const lines = [];
      const colors = [0x00D9FF, 0x8B5CF6, 0xFF7A00];
      for (let i = 0; i < 20; i++) {
        const pts = [];
        const x = (Math.random()-0.5)*6, y = (Math.random()-0.5)*4;
        for (let j = 0; j < 30; j++) pts.push(new THREE.Vector3(x + j*0.2, y + (Math.random()-0.5)*0.3, (Math.random()-0.5)*2));
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: colors[i%3], opacity: 0.3, transparent: true }));
        lines.push(line); scene.add(line);
      }
      const anim = () => { animFrame = requestAnimationFrame(anim); t.v += 0.005; lines.forEach((l, i) => { l.position.x = -((t.v * 0.5 + i * 0.3) % 6); }); renderer.render(scene, cam); };
      anim();
    }

    return () => { cancelAnimationFrame(animFrame); renderer.dispose(); };
  }, [index]);

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'var(--surface)', minHeight: '380px' }}>
      <canvas ref={ref} style={{ width: '100%', height: '380px', display: 'block' }} />
    </div>
  );
}

// ── MAIN SERVICES PAGE ──
export default function Services() {
  const navigate = useNavigate();
  const { data: services, loading } = useFetch(fetchServices);

  useEffect(() => {
    if (!services?.length) return;
    // Small delay to let DOM render first
    const timer = setTimeout(() => {
      document.querySelectorAll('.svc-block').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });
    }, 100);
    return () => { clearTimeout(timer); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [services]);

  return (
    <>
      {/* PAGE HEADER */}
      <section style={{ padding: '180px 80px 100px', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,217,255,.05) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow">SERVICES / CAPABILITIES</p>
          <h1 style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: '#fff', letterSpacing: '-2px', maxWidth: '700px', lineHeight: 1.05 }}>
            Every tool in the arsenal.
          </h1>
        </div>
      </section>

      {/* LOADING STATE */}
      {loading && (
        <div style={{ padding: '120px 80px', maxWidth: '1400px', margin: '0 auto' }}>
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '400px', marginBottom: '80px', borderRadius: '12px' }} />
          ))}
        </div>
      )}

      {/* SERVICE BLOCKS — one per service from API/fallback */}
      {!loading && services?.map((s, i) => (
        <div
          key={s.id}
          className="svc-block"
          style={{ padding: '100px 80px', borderBottom: '1px solid var(--glass-border)', maxWidth: '1400px', margin: '0 auto' }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            direction: i % 2 === 1 ? 'rtl' : 'ltr'
          }}>
            {/* TEXT SIDE */}
            <div style={{ direction: 'ltr' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--blue)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>
                {s.tag}
              </p>
              <h2 style={{ fontFamily: 'var(--heading)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: '24px', lineHeight: 1.1 }}>
                {s.title}
              </h2>
              <p style={{ fontFamily: 'var(--body-font)', fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '36px' }}>
                {s.fullDescription || s.description}
              </p>
              {s.bullets?.length > 0 && (
                <ul style={{ listStyle: 'none', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {s.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--body-font)', fontSize: '14px', color: 'var(--body)' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)', flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="btn-primary"
                onClick={() => navigate('/contact')}
                style={{ fontSize: '13px', padding: '12px 28px' }}
              >
                START THIS SERVICE →
              </button>
            </div>

            {/* CANVAS SIDE */}
            <div style={{ direction: 'ltr' }}>
              <ServiceCanvas index={i} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
