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
      {/* 3D Spline Scene with Parallax */}
      <div
        className="spline-wrapper"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translateY(${scrollY * 0.5}px)`,
        }}
      >
        <iframe
          src="https://my.spline.design/zerogravityphysicslandingpage-0a9EMuJ6kAZQaj1SXV7WLa4H/"
          frameBorder="0"
          width="100%"
          height="100%"
          title="Spline Scene"
        />
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
