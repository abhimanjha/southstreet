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

  // Lookbook images
  const lookbookImages = [
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
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

      {/* Lookbook Gallery */}
      <section className="section" id="lookbook">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Lookbook</h2>
          <p className="section-subtitle">
            Style inspiration from our latest collection
          </p>
        </div>
        <div className="lookbook-gallery animate-on-scroll">
          {lookbookImages.map((image, index) => (
            <div key={index} className="lookbook-item">
              <img src={image} alt={`Lookbook ${index + 1}`} className="lookbook-image" />
              <div className="lookbook-overlay">
                <svg className="lookbook-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Spotlight />

    </>

  );
}

export default Home;
