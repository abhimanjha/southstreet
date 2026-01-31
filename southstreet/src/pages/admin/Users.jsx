import { useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joinDate: '2024-01-15', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', joinDate: '2023-11-20', status: 'Active' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Customer', joinDate: '2024-01-28', status: 'Inactive' },
        { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Customer', joinDate: '2024-02-01', status: 'Active' },
    ]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Users</h1>
                    <p style={{ color: '#666' }}>Manage your customers and administrative staff.</p>
                </div>
                <button
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}
                >
                    + Add New User
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f4f4f4' }}>
                            <th style={thStyle}>Full Name</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Role</th>
                            <th style={thStyle}>Join Date</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                <td style={{ ...tdStyle, fontWeight: '600' }}>{user.name}</td>
                                <td style={tdStyle}>{user.email}</td>
                                <td style={tdStyle}>
                                    <span style={{
                                        color: user.role === 'Admin' ? '#7f5af0' : '#333',
                                        fontWeight: user.role === 'Admin' ? '600' : '400'
                                    }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={tdStyle}>{user.joinDate}</td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: user.status === 'Active' ? '#2ecc71' : '#bdc3c7'
                                        }}></div>
                                        {user.status}
                                    </div>
                                </td>
                                <td style={tdStyle}>
                                    <button style={{ marginRight: '10px', background: 'none', border: 'none', color: '#111', cursor: 'pointer', fontWeight: '500' }}>View</button>
                                    <button style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>Suspend</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const thStyle = {
    padding: '15px 10px',
    color: '#888',
    fontSize: '0.85rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const tdStyle = {
    padding: '15px 10px',
    fontSize: '0.95rem',
    color: '#333'
};

export default Users;
