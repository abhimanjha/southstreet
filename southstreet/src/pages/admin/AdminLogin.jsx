import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { setAdminToken } from '../../utils/auth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Using the actual authAPI for admin login
            const response = await authAPI.adminLogin({
                email: email.trim(),
                password: password.trim()
            });

            const { token, user } = response.data.data;

            // Verify role just in case backend doesn't
            if (user.role !== 'admin') {
                throw new Error('Unauthorized: Access denied');
            }

            setAdminToken(token);
            // We can still set user info in localStorage if needed for display, 
            // ensuring it doesn't overwrite the main 'user' key if we want strict separation,
            // but for now, 'user' key is used for display. 
            // Actually, let's use a separate key for admin user info too to be safe.
            localStorage.setItem('adminUser', JSON.stringify(user));

            navigate('/admin');
        } catch (err) {
            console.error('Admin login error:', err);
            // Fallback for dev/demo if backend fails or doesn't have this endpoint yet,
            // but ideally we want real auth. 
            // For now, if API fails, we show the error.
            setError(err.response?.data?.message || err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#ffffff', // White background
            color: '#111'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '450px',
                padding: '40px',
                backgroundColor: '#fff',
                borderRadius: '8px', // Match standard radius
                textAlign: 'center',
                // Optional: refined shadow if needed, or clean flat look
                // boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
            }}>
                <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    marginBottom: '10px',
                    fontSize: '2.5rem',
                    color: '#000'
                }}>SOUTHSTREET</h2>
                <h3 style={{
                    fontSize: '0.85rem',
                    color: '#666',
                    marginBottom: '40px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: '500'
                }}>Admin Portal</h3>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '12px',
                        borderRadius: '4px',
                        marginBottom: '25px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#111' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            placeholder="Enter admin email"
                            required
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '500', color: '#111' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '14px',
                            backgroundColor: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            opacity: loading ? 0.7 : 1,
                            transition: 'opacity 0.2s'
                        }}
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>

                <div style={{ marginTop: '30px', fontSize: '0.8rem', color: '#888' }}>
                    &copy; {new Date().getFullYear()} SouthStreet. All rights reserved.
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5', // Light grey border
    borderRadius: '4px',
    color: '#111',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s'
};

export default AdminLogin;
