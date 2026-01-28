import { useEffect, useRef } from 'react';

const Collections = () => {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const scrolled = window.scrollY;
                const parallaxImage = parallaxRef.current.querySelector('.parallax-image');
                if (parallaxImage) {
                    // Adjusted calculation since we're not at the top of the page necessarily
                    // or just keep it simple
                    parallaxImage.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const lookbookImages = [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
        'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
    ];

    return (
        <div className="collections-page">
            {/* Featured Collection with Parallax */}
            <section className="featured-collection" ref={parallaxRef} style={{ marginTop: '80px' }}>
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920"
                    alt="Featured Collection"
                    className="parallax-image"
                />
                <div className="featured-content animate-on-scroll visible">
                    <span className="featured-tag">Spring 2026</span>
                    <h2 className="featured-title">The Minimalist Edit</h2>
                    <p className="featured-description">
                        A carefully curated selection of timeless pieces that embody
                        understated elegance and contemporary sophistication.
                    </p>
                </div>
            </section>

            {/* Lookbook Gallery */}
            <section className="section" id="lookbook">
                <div className="section-header animate-on-scroll visible">
                    <h2 className="section-title">Lookbook</h2>
                    <p className="section-subtitle">
                        Style inspiration from our latest collection
                    </p>
                </div>
                <div className="lookbook-gallery animate-on-scroll visible">
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
        </div>
    );
};

export default Collections;
