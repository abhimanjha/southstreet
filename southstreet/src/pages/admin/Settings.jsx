import { useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState({
        storeName: 'SouthStreet Wear',
        contactEmail: 'admin@southstreet.com',
        currency: 'USD',
        maintenanceMode: false,
        lowStockThreshold: 10,
        enableNotifications: true
    });

    const handleToggle = (field) => {
        setSettings({ ...settings, [field]: !settings[field] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Settings</h1>
                <p style={{ color: '#666' }}>Configure your store's global preferences.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={cardStyle}>
                    <h2 style={sectionTitleStyle}>Store Information</h2>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Store Name</label>
                        <input name="storeName" value={settings.storeName} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Contact Email</label>
                        <input name="contactEmail" value={settings.contactEmail} onChange={handleChange} style={inputStyle} />
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={sectionTitleStyle}>General Preferences</h2>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Store Currency</label>
                        <select name="currency" value={settings.currency} onChange={handleChange} style={inputStyle}>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="INR">INR (₹)</option>
                        </select>
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Low Stock Alert Threshold</label>
                        <input type="number" name="lowStockThreshold" value={settings.lowStockThreshold} onChange={handleChange} style={inputStyle} />
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={sectionTitleStyle}>System Status</h2>
                    <div style={toggleRowStyle}>
                        <div>
                            <p style={{ fontWeight: '600', marginBottom: '4px' }}>Maintenance Mode</p>
                            <p style={{ fontSize: '0.85rem', color: '#666' }}>Temporarily disable the storefront for maintenance.</p>
                        </div>
                        <div onClick={() => handleToggle('maintenanceMode')} style={{ ...toggleStyle, backgroundColor: settings.maintenanceMode ? '#111' : '#eee' }}>
                            <div style={{ ...toggleCircleStyle, transform: settings.maintenanceMode ? 'translateX(24px)' : 'translateX(0)' }} />
                        </div>
                    </div>
                    <div style={{ ...toggleRowStyle, border: 'none' }}>
                        <div>
                            <p style={{ fontWeight: '600', marginBottom: '4px' }}>Email Notifications</p>
                            <p style={{ fontSize: '0.85rem', color: '#666' }}>Receive emails for new orders and low stock.</p>
                        </div>
                        <div onClick={() => handleToggle('enableNotifications')} style={{ ...toggleStyle, backgroundColor: settings.enableNotifications ? '#111' : '#eee' }}>
                            <div style={{ ...toggleCircleStyle, transform: settings.enableNotifications ? 'translateX(24px)' : 'translateX(0)' }} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                    <button style={{ padding: '12px 30px', border: '1px solid #111', background: '#fff', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                    <button style={{ padding: '12px 40px', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    border: '1px solid #eee',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

const sectionTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '20px',
    borderBottom: '1px solid #f4f4f4',
    paddingBottom: '10px'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
};

const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#333'
};

const inputStyle = {
    padding: '12px',
    border: '1px solid #eee',
    borderRadius: '4px',
    fontSize: '0.95rem',
    backgroundColor: '#fafafa',
    width: '100%'
};

const toggleRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #f9f9f9'
};

const toggleStyle = {
    width: '50px',
    height: '26px',
    borderRadius: '13px',
    padding: '2px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
};

const toggleCircleStyle = {
    width: '22px',
    height: '22px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    transition: 'transform 0.3s'
};

export default Settings;
