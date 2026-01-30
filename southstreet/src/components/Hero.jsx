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
        {/* Floating Fashion Images */}
        <div className="fashion-element hero-item-1" style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotateX(${scrollY * 0.1}deg)` }}>
          <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400" alt="Jacket" className="hero-img" />
        </div>
        <div className="fashion-element hero-item-2" style={{ transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px) rotateY(${scrollY * 0.05}deg)` }}>
          <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400" alt="Dress" className="hero-img" />
        </div>
        <div className="fashion-element hero-item-3" style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px) rotateZ(${scrollY * 0.08}deg)` }}>
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" alt="Fashion" className="hero-img" />
        </div>
        <div className="fashion-element hero-item-4" style={{ transform: `translate(${mousePosition.x * -0.4}px, ${mousePosition.y * 0.4}px) rotateX(${scrollY * -0.06}deg)` }}>
          <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400" alt="Hoodie" className="hero-img" />
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
