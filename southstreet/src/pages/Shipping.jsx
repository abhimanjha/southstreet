
import React from 'react';

const Shipping = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-white)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Shipping & Delivery</h2>
                    <p className="section-subtitle">Everything you need to know about our shipping policies.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center' }}>
                    <div className="text-content">
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Standard Shipping</h3>
                            <p>We offer complimentary standard shipping on all orders over $200. For orders under $200, a flat rate of $15 applies. Please allow 3-5 business days for delivery.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Express Delivery</h3>
                            <p>Need it sooner? Select Express Delivery at checkout for $35 to receive your order within 1-2 business days. Orders placed before 12pm EST ship the same day.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>International Shipping</h3>
                            <p>We ship globally. International shipping rates are calculated at checkout based on destination and weight. Duties and taxes may apply upon delivery.</p>
                        </div>
                    </div>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800" alt="Shipping" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
