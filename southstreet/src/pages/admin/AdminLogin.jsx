import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Add real authentication here
        if (email === 'admin@southstreet.com' && password === 'admin123') {
            navigate('/admin');
        } else {
            alert('Invalid Admin Credentials');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#000', // Black background for premium feel
            color: '#fff'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '10px', fontSize: '2rem' }}>SOUTHSTREET</h2>
                <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin Portal</h3>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: '#ccc' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            placeholder="admin@southstreet.com"
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: '#ccc' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            placeholder="Use: admin123"
                        />
                    </div>

                    <button type="submit" style={{
                        padding: '12px',
                        backgroundColor: '#fff',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Access Dashboard
                    </button>
                </form>

                <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#555' }}>
                    Authorized Personnel Only
                </p>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#fff',
    outline: 'none',
    fontSize: '0.9rem'
};

export default AdminLogin;
