
import React from 'react';

const CookiePolicy = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-white)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Cookie Policy</h2>
                    <p className="section-subtitle">Understanding how we use cookies.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
                    <div className="text-content">
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>What Are Cookies</h3>
                            <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>How We Use Cookies</h3>
                            <p>We use cookies to understand how you use our website, remember your preferences, and improve your user experience. We also use cookies for analytics and marketing purposes.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Managing Cookies</h3>
                            <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
                        </div>
                    </div>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: 'fit-content' }}>
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800" alt="Cookie Policy" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
