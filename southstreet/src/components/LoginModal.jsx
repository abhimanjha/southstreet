import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authAPI } from '../services/api';
import { setAuthToken, setUser } from '../utils/auth';

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                // Login
                const response = await authAPI.login({
                    email: formData.email,
                    password: formData.password
                });

                const { token, user } = response.data.data;
                setAuthToken(token);
                setUser(user);

                onClose();

                // Optional: Admin redirect
                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    // Just reload or stay on page to update UI state
                    window.location.reload();
                }
            } else {
                // Register
                if (formData.password !== formData.confirmPassword) {
                    throw new Error("Passwords don't match");
                }

                const response = await authAPI.register({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                });

                // Do NOT set auth token here.
                // Switch to login mode and show success message
                setIsLogin(true);
                setError('Registration successful! Please login.');

                // Clear form password fields
                setFormData(prev => ({
                    ...prev,
                    password: '',
                    confirmPassword: ''
                }));

            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.response?.data?.message || err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');

        try {
            const response = await authAPI.googleAuth(credentialResponse.credential);
            const { token, user } = response.data.data;

            setAuthToken(token);
            setUser(user);
            onClose();

            // Reload to update UI state
            window.location.reload();
        } catch (err) {
            console.error('Google auth error:', err);
            setError(err.response?.data?.message || 'Google authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google sign-in was cancelled or failed');
    };

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
            backdropFilter: 'blur(5px)',
            padding: '10px'
        }} onClick={onClose}>
            <div className="login-modal" style={{
                backgroundColor: 'var(--color-white)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                width: '100%',
                maxWidth: '420px',
                position: 'relative',
                boxShadow: 'var(--shadow-xl)'
            }} onClick={(e) => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--color-charcoal)'
                }}>&times;</button>

                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1.5rem' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                {error && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '8px', borderRadius: '4px', marginBottom: '12px', fontSize: '0.85rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {!isLogin && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="First"
                                    required={!isLogin}
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="Last"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Enter your phone number"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--text-sm)', fontWeight: '500' }}>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Confirm password"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            marginTop: 'var(--space-sm)',
                            backgroundColor: 'var(--color-black)',
                            color: 'var(--color-white)',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#e5e7eb' }}></div>
                    <span style={{ position: 'relative', backgroundColor: 'white', padding: '0 16px', color: '#6b7280', fontSize: '0.875rem' }}>OR</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap={false}
                        text={isLogin ? 'signin_with' : 'signup_with'}
                        shape="rectangular"
                        size="large"
                        width="100%"
                    />
                </div>

                <p style={{ textAlign: 'center', marginTop: 'var(--space-lg)', fontSize: 'var(--text-sm)', color: 'var(--color-slate-grey)' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
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
