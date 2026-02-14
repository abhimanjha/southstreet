import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useEffect, useRef } from 'react';
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Spotlight from "../components/Spotlight";


function Home() {
  const { products, fetchProducts } = useContext(ShopContext);
  const parallaxRef = useRef(null);
  const shopByStyleRef = useRef(null);

  const scrollShopByStyle = (direction) => {
    if (shopByStyleRef.current) {
      const scrollAmount = 350; // Card width + gap
      shopByStyleRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  // Refresh products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Scroll animation observer
  useEffect(() => {

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Parallax scroll effect for featured collection
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const parallaxImage = parallaxRef.current.querySelector('.parallax-image');
        if (parallaxImage) {
          parallaxImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Category data
  const categories = [
    { id: 1, name: 'Men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2187&auto=format&fit=crop' }, // Classic Men's Fashion (Suits/Clean lines)
    { id: 2, name: 'Women', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2669&auto=format&fit=crop' }, // Elegant Women's Fashion
    { id: 3, name: 'Streetwear', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2574&auto=format&fit=crop' }, // Premium Streetwear
    { id: 4, name: 'Luxury', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop' }, // High-end Fashion/Lifestyle
  ];



  return (
    <>
      <Hero />


      {/* New Arrivals Section */}
      <section className="section" id="new-arrivals">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">
            Discover the latest additions to our curated collection
          </p>
        </div>
        <div className="product-grid animate-on-scroll">
          {products.slice(0, 6).map((product) => {
            const image = product.images && product.images.length > 0
              ? product.images[0]
              : 'https://via.placeholder.com/300';

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={image}
                name={product.name}
                price={product.price}
              />
            );
          })}
        </div>
      </section>


      {/* Categories Section - Continuous Scroll Carousel */}
      <section className="section" id="categories" style={{ backgroundColor: 'var(--color-light-grey)', overflow: 'hidden' }}>
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Explore our carefully curated collections
          </p>
        </div>

        <div className="category-carousel-container">
          <div className="category-carousel-track">
            {/* Original Set */}
            {categories.map((category) => (
              <div className="category-carousel-item" key={`orig-${category.id}`}>
                <CategoryCard
                  image={category.image}
                  name={category.name}
                />
              </div>
            ))}
            {/* Duplicated Set for Loop */}
            {categories.map((category) => (
              <div className="category-carousel-item" key={`dup-${category.id}`}>
                <CategoryCard
                  image={category.image}
                  name={category.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection with Parallax */}
      <section className="featured-collection" ref={parallaxRef}>
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920"
          alt="Featured Collection"
          className="parallax-image"
        />
        <div className="featured-content animate-on-scroll">
          <span className="featured-tag">Spring 2026</span>
          <h2 className="featured-title">The Minimalist Edit</h2>
          <p className="featured-description">
            A carefully curated selection of timeless pieces that embody
            understated elegance and contemporary sophistication. Each item
            is designed to seamlessly integrate into your wardrobe.
          </p>
          <button className="btn-primary" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', border: '1px solid var(--color-black)' }}>
            View Collection
          </button>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="brand-story">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
          alt="Brand Story"
          className="brand-image"
        />
        <div className="brand-content animate-on-scroll">
          <h2 className="brand-title">
            Crafted for the Modern Connoisseur
          </h2>
          <p className="brand-text">
            SouthStreet represents the intersection of timeless design and
            contemporary innovation. Each piece in our collection is
            meticulously crafted to embody the essence of refined luxury.
          </p>
          <p className="brand-text">
            We believe in creating fashion that transcends trends, focusing
            on quality, sustainability, and the art of understated elegance.
          </p>
          <button className="btn-primary" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', border: '1px solid var(--color-black)', marginTop: 'var(--space-lg)' }}>
            Our Story
          </button>
        </div>
      </section>

      {/* Shop By Style Section (Replaces Lookbook) */}
      <section className="section" id="shop-by-style">
        <div className="shop-by-style-header animate-on-scroll">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Shop By Style</h2>
          <div className="slider-nav-container">
            <button
              onClick={() => scrollShopByStyle('left')}
              className="slider-nav-btn"
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scrollShopByStyle('right')}
              className="slider-nav-btn"
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="product-slider animate-on-scroll" ref={shopByStyleRef}>

          {[
            { id: 1, name: 'Casual', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop' },
            { id: 2, name: 'Formal', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop' },
            { id: 3, name: 'Party', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop' },
            { id: 4, name: 'Activewear', image: 'https://images.unsplash.com/photo-1483726234545-481d6e880fc6?w=800&auto=format&fit=crop' },
            { id: 5, name: 'Vacation', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop' },
          ].map((style) => (
            <div className="shop-by-style-card" key={style.id}>
              <div className="shop-by-style-image-wrapper">
                <img
                  src={style.image}
                  alt={style.name}
                  className="shop-by-style-image"
                />
              </div>
              <h3 className="shop-by-style-title">{style.name}</h3>
            </div>
          ))}

        </div>
      </section>


      <Spotlight />

    </>

  );
}

export default Home;
