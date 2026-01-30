
import React from 'react';

const FAQ = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-white)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">Find answers to common questions.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
                    <div className="text-content">
                        <div className="faq-item" style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)', fontWeight: '600' }}>Where are your products made?</h3>
                            <p>Our products are designed in New York and ethically manufactured in Portugal and Italy, working with partners who share our commitment to quality and fair labor practices.</p>
                        </div>

                        <div className="faq-item" style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)', fontWeight: '600' }}>How do I care for my garments?</h3>
                            <p>Each item comes with specific care instructions on the label. Generally, we recommend gentle machine wash or hand wash for cottons, and dry cleaning for wool and silk items to maintain their quality.</p>
                        </div>

                        <div className="faq-item" style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)', fontWeight: '600' }}>Do you offer gift wrapping?</h3>
                            <p>Yes, we offer premium gift packaging. You can select the gift options at checkout. Your order will arrive in our signature black box with a personalized note.</p>
                        </div>

                        <div className="faq-item" style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)', fontWeight: '600' }}>Can I modify my order?</h3>
                            <p>We process orders quickly. If you need to make changes, please contact our support team within 1 hour of placing your order.</p>
                        </div>
                    </div>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800" alt="FAQ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
