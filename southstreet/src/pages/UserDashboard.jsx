import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout, isAuthenticated, setUser } from '../utils/auth';
import { authAPI } from '../services/api';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
            return;
        }
        const userData = getUser();
        setUserData(userData);
        if (userData) {
            setEditForm({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                phone: userData.phone || ''
            });
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await authAPI.updateProfile(editForm);
            const updatedUser = response.data.data.user;

            // Update local storage and state
            setUser(updatedUser);
            setUserData(updatedUser);

            setMessage('Profile updated successfully!');
            setIsEditing(false);

            // Clear message after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('Update error:', err);
            setMessage('Failed to update profile. Please try again.');
        }
    };

    if (!user) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
            <h1 className="section-title" style={{ marginBottom: '40px' }}>My Account</h1>

            <div style={{
                backgroundColor: 'var(--color-white)',
                padding: '40px',
                borderRadius: '8px',
                border: '1px solid var(--color-light-grey)'
            }}>
                {message && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '20px',
                        borderRadius: '4px',
                        backgroundColor: message.includes('success') ? '#d1fae5' : '#fee2e2',
                        color: message.includes('success') ? '#065f46' : '#dc2626',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--color-light-grey)', paddingBottom: '20px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-black)',
                        color: 'var(--color-white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        marginRight: '20px'
                    }}>
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>{user.firstName} {user.lastName}</h2>
                        <p style={{ color: 'var(--color-dark-grey)' }}>{user.email}</p>
                        <p style={{ color: 'var(--color-slate-grey)', fontSize: '14px', marginTop: '5px' }}>
                            Member since {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr)', gap: '20px' }}>
                    <div className="dashboard-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <h3 style={{ fontSize: '18px', margin: 0 }}>Account Details</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-blue)',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                {isEditing ? 'Cancel' : 'Edit Details'}
                            </button>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdateProfile}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editForm.firstName}
                                        onChange={handleEditChange}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editForm.lastName}
                                        onChange={handleEditChange}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={editForm.phone}
                                        onChange={handleEditChange}
                                        style={inputStyle}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#888' }}>Email (Cannot be changed)</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        style={{ ...inputStyle, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                                    />
                                </div>
                                <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--color-black)', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <>
                                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                            </>
                        )}
                    </div>

                    {/* Placeholder for future Orders section */}
                    <div className="dashboard-card">
                        <h3 style={{ fontSize: '18px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Recent Orders</h3>
                        <p style={{ color: 'var(--color-slate-grey)', fontStyle: 'italic' }}>No orders found.</p>
                        <button className="btn-secondary" style={{ marginTop: '15px' }} onClick={() => navigate('/shop')}>
                            Start Shopping
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--color-light-grey)' }}>
                    <button
                        onClick={handleLogout}
                        className="btn-primary"
                        style={{
                            backgroundColor: 'var(--color-black)',
                            color: 'var(--color-white)'
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <style jsx>{`
                .dashboard-card {
                    padding: 20px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                }
            `}</style>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
};

export default UserDashboard;
