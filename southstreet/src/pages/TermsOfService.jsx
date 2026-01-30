
import React from 'react';

const TermsOfService = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-light-grey)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Terms of Service</h2>
                    <p className="section-subtitle">Please read these terms carefully before using our services.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: 'fit-content' }}>
                        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800" alt="Terms of Service" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    </div>
                    <div className="text-content">
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Agreement to Terms</h3>
                            <p>By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Intellectual Property</h3>
                            <p>The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and other proprietary laws.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Purchases</h3>
                            <p>If you wish to purchase any product, you may be asked to supply certain information relevant to your purchase including, without limitation, your credit card number and billing address.</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Limitation of Liability</h3>
                            <p>In no event shall SouthStreet be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
