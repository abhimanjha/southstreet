
import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="login-modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div className="login-modal" style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-xl)',
                borderRadius: 'var(--radius-lg)',
                width: '100%',
                maxWidth: '450px',
                position: 'relative',
                boxShadow: 'var(--shadow-xl)'
            }} onClick={(e) => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--color-charcoal)'
                }}>&times;</button>

                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)', fontSize: 'var(--text-3xl)' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    {!isLogin && (
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Full Name</label>
                            <input type="text" style={inputStyle} placeholder="Enter your name" />
                        </div>
                    )}
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Email Address</label>
                        <input type="email" style={inputStyle} placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Password</label>
                        <input type="password" style={inputStyle} placeholder="Enter your password" />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 'var(--space-sm)', backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: 'var(--text-sm)', color: 'var(--color-slate-grey)' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: '600', color: 'var(--color-black)' }}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid var(--color-medium-grey)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-sm)',
    outline: 'none',
    transition: 'border-color 0.3s ease'
};

export default LoginModal;
