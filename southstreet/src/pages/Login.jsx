import { useState } from 'react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login-page section" style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="auth-container" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-md)' }}>
                <h2 className="section-title" style={{ marginBottom: '30px' }}>{isLogin ? 'Login' : 'Register'}</h2>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {!isLogin && (
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Full Name</label>
                            <input type="text" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Enter your name" />
                        </div>
                    )}
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Email</label>
                        <input type="email" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Password</label>
                        <input type="password" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Enter your password" />
                    </div>

                    <button type="submit" className="btn-primary" style={{ backgroundColor: 'black', color: 'white', width: '100%', marginTop: '10px' }}>
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
