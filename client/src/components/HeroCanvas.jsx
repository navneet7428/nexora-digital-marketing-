import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Particles
    const pCount = 3000;
    const pGeo   = new THREE.BufferGeometry();
    const pos    = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00D9FF, size: 0.015, transparent: true, opacity: 0.5 }));
    scene.add(particles);

    // Torus knot
    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.2, 0.3, 128, 16),
      new THREE.MeshBasicMaterial({ color: 0x00D9FF, wireframe: true, opacity: 0.08, transparent: true })
    );
    scene.add(torus);

    // Ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.005, 2, 120),
      new THREE.MeshBasicMaterial({ color: 0x8B5CF6, opacity: 0.15, transparent: true })
    );
    scene.add(ring);

    let frame;
    function animate() {
      frame = requestAnimationFrame(animate);
      particles.rotation.y += 0.0002;
      particles.rotation.x += 0.0001;
      torus.rotation.x     += 0.003;
      torus.rotation.y     += 0.005;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouse = e => {
      const rx = (e.clientY / window.innerHeight - 0.5) * 0.3;
      const ry = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      gsap.to(particles.rotation, { x: rx, y: ry, duration: 2, ease: 'power2.out' });
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(frame);
      renderer.dispose();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}
