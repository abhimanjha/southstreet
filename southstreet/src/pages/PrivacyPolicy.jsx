
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-white)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Privacy Policy</h2>
                    <p className="section-subtitle">Your privacy is important to us.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
                    <div className="text-content">
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Information We Collect</h3>
                            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter. This may include your name, email address, shipping address, and payment information.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>How We Use Your Information</h3>
                            <p>We use the information we collect to process your orders, communicate with you, and improve our services. We do not sell your personal data to third parties.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Security</h3>
                            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Your Rights</h3>
                            <p>You have the right to access, correct, or delete your personal information. Please contact us at privacy@southstreet.com for any privacy-related inquiries.</p>
                        </div>
                    </div>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: 'fit-content' }}>
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800" alt="Privacy Policy" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
