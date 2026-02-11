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
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(8px)',
            padding: '20px'
        }} onClick={onClose}>
            <div className="login-modal" style={{
                backgroundColor: '#ffffff',
                padding: '48px 40px',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '450px',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                animation: 'slideIn 0.3s ease-out'
            }} onClick={(e) => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    fontSize: '28px',
                    cursor: 'pointer',
                    color: '#111',
                    lineHeight: '1',
                    padding: '4px 8px',
                    transition: 'opacity 0.2s'
                }} onMouseEnter={(e) => e.target.style.opacity = '0.6'} onMouseLeave={(e) => e.target.style.opacity = '1'}>&times;</button>

                {/* Logo/Brand Area */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto' }}>
                        <path d="M30 0L60 15V45L30 60L0 45V15L30 0Z" fill="#111" />
                        <text x="30" y="38" fontSize="24" fill="white" textAnchor="middle" fontWeight="bold">SS</text>
                    </svg>
                </div>

                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '8px',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#111',
                    letterSpacing: '-0.5px'
                }}>
                    {isLogin ? 'Log in to your account' : 'Create your account'}
                </h2>

                <p style={{
                    textAlign: 'center',
                    marginBottom: '32px',
                    fontSize: '15px',
                    color: '#757575',
                    lineHeight: '1.5'
                }}>
                    {isLogin ? 'Get personalised picks & faster checkout' : 'Join us for exclusive access & benefits'}
                </p>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        textAlign: 'center',
                        border: '1px solid #fecaca'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {!isLogin && (
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="First Name"
                                    required={!isLogin}
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    placeholder="Last Name"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Email address"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Phone number"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="Password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Confirm Password"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    {!isLogin && (
                        <p style={{
                            fontSize: '12px',
                            color: '#8D8D8D',
                            lineHeight: '1.6',
                            margin: '0'
                        }}>
                            By entering this site, you agree to the{' '}
                            <a href="/terms" style={{ color: '#111', textDecoration: 'underline' }}>Terms & Conditions</a>
                            {' '}and{' '}
                            <a href="/privacy" style={{ color: '#111', textDecoration: 'underline' }}>Privacy Policy</a>
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            marginTop: '8px',
                            backgroundColor: loading ? '#CCCCCC' : '#111',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            letterSpacing: '0.5px'
                        }}
                        onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#333')}
                        onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#111')}
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div style={{ margin: '28px 0', textAlign: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#E5E5E5' }}></div>
                    <span style={{ position: 'relative', backgroundColor: 'white', padding: '0 20px', color: '#8D8D8D', fontSize: '14px', fontWeight: '500' }}>OR</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
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

                <p style={{
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#8D8D8D',
                    margin: '0'
                }}>
                    {isLogin ? "Not a member? " : "Already a member? "}
                    <span
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        style={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontWeight: '600',
                            color: '#111',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        {isLogin ? 'Join us' : 'Sign in'}
                    </span>
                </p>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: '#ffffff',
    color: '#111'
};

export default LoginModal;
