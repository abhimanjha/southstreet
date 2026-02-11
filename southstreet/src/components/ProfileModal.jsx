import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { authAPI } from '../services/api';
import { setUser as updateLocalUser } from '../utils/auth';
import '../App.css';

const ProfileModal = ({ isOpen, onClose, user }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        shoppingPreference: 'Men\'s',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                shoppingPreference: user.shoppingPreference || 'Men\'s', // assuming this might be added later
                phone: user.phone || '', // assuming this might be added later
                email: user.email || ''
            });
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Only send fields that the backend is likely to expect, or try sending all if we want to be "exact"
            // For now, we'll send what we have.
            const response = await authAPI.updateProfile(formData);
            const updatedUser = response.data.data.user;

            updateLocalUser(updatedUser);
            setMessage('Profile updated successfully');
            setTimeout(() => {
                setMessage('');
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Update profile error:', error);
            setMessage('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="profile-modal-overlay">
            <div className="profile-modal-content">
                <button className="profile-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="profile-modal-header">
                    <svg className="nike-logo-modal" viewBox="0 0 24 24" width="60px" height="60px">
                        <path fill="#111" d="" />
                    </svg>
                    <h2>Profile Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="profile-modal-form">
                    <div className="profile-input-group">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label>First Name*</label>
                    </div>

                    <div className="profile-input-group">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label>Last Name*</label>
                    </div>

                    <div className="profile-input-group">
                        <select
                            name="shoppingPreference"
                            value={formData.shoppingPreference}
                            onChange={handleChange}
                        >
                            <option value="Men's">Men's</option>
                            <option value="Women's">Women's</option>
                        </select>
                        <label className="select-label">Shopping Preference*</label>
                    </div>

                    <div className="profile-input-group">
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Phone Number</label>
                    </div>

                    <div className="profile-input-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            disabled // Email usually can't be changed easily
                            placeholder=" "
                            className="readonly-input"
                        />
                        <label>Email Address*</label>
                    </div>

                    {message && <div className={`profile-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

                    <button type="submit" className="profile-update-btn" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
