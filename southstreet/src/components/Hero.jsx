import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      setMousePosition({ x: moveX * 20, y: moveY * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hero-section" ref={heroRef}>
      {/* Custom 3D Street Wear Scene with Parallax */}
      <div
        className="hero-3d-scene"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Floating Fashion Elements */}
        <div className="fashion-element jacket" style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotateX(${scrollY * 0.1}deg)` }}>
          <div className="jacket-shape"></div>
        </div>
        <div className="fashion-element shoes" style={{ transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px) rotateY(${scrollY * 0.05}deg)` }}>
          <div className="shoe-left"></div>
          <div className="shoe-right"></div>
        </div>
        <div className="fashion-element hat" style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px) rotateZ(${scrollY * 0.08}deg)` }}>
          <div className="hat-shape"></div>
        </div>
        <div className="fashion-element pants" style={{ transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * 0.4}px) rotateX(${scrollY * -0.06}deg)` }}>
          <div className="pants-shape"></div>
        </div>
        <div className="fashion-element bag" style={{ transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * -0.6}px) rotateY(${scrollY * 0.03}deg)` }}>
          <div className="bag-shape"></div>
        </div>
      </div>

      {/* Overlay Gradient for Text Readability */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text fade-in">
          <h1 className="hero-title">
            Redefining
            <br />
            Luxury Fashion
          </h1>
          <p className="hero-subtitle">
            Discover the intersection of timeless elegance and contemporary design
          </p>
        </div>

        <div className="hero-cta slide-up">
          <button className="btn-primary">Shop Collection</button>
          <button className="btn-secondary">Explore New Arrivals</button>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </div>
  );
}
