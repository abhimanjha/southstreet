
import React from 'react';

const Contact = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-light-grey)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Contact Us</h2>
                    <p className="section-subtitle">We'd love to hear from you. Get in touch with our team.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center' }}>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src="https://images.unsplash.com/photo-1423666639041-f14d7045c573?w=800" alt="Contact Us" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="text-content">
                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Customer Service</h3>
                            <p style={{ marginBottom: 'var(--space-xs)' }}>Email: support@southstreet.com</p>
                            <p>Phone: +1 (555) 123-4567</p>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-grey)', marginTop: 'var(--space-xs)' }}>Mon-Fri, 9am - 6pm EST</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Press Inquiries</h3>
                            <p>Email: press@southstreet.com</p>
                        </div>

                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Headquarters</h3>
                            <address style={{ fontStyle: 'normal', lineHeight: '1.6' }}>
                                123 Fashion Ave,<br />
                                New York, NY 10001,<br />
                                United States
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
