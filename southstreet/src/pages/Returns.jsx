
import React from 'react';

const Returns = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-light-grey)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Returns & Exchanges</h2>
                    <p className="section-subtitle">Our commitment to your satisfaction.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center' }}>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src="https://images.unsplash.com/photo-1556906781-9a412961d289?w=800" alt="Returns" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="text-content">
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Return Policy</h3>
                            <p>We accept returns of unworn, unwashed items with original tags attached within 30 days of delivery. Sale items are final sale.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>How to Return</h3>
                            <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                                <li>Visit our Returns Portal and enter your order number.</li>
                                <li>Select the items you wish to return and the reason.</li>
                                <li>Print the prepaid shipping label sent to your email.</li>
                                <li>Pack your items and drop off the package at any authorized carrier location.</li>
                            </ol>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Refunds</h3>
                            <p>Refunds are processed within 5-7 business days of receiving your return. The amount will be credited back to your original payment method.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;
