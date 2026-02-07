import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const TrackOrder = () => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderId.trim()) {
            navigate(`/orders/${orderId.trim()}`);
        }
    };

    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="section-title">Track Your Order</h1>
            <p style={{ marginBottom: '40px', color: '#666', textAlign: 'center', maxWidth: '500px' }}>
                Enter your Order ID below to view the current status and details of your shipment.
            </p>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter Order ID (e.g. 123e4567...)"
                    style={{
                        flex: 1,
                        padding: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        padding: '15px 30px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '600'
                    }}
                >
                    <Search size={20} />
                    Track
                </button>
            </form>

            <div style={{ marginTop: '40px', background: '#f9f9f9', padding: '30px', borderRadius: '8px', maxWidth: '600px', width: '100%' }}>
                <h3 style={{ marginBottom: '15px' }}>How to find your Order ID?</h3>
                <p style={{ color: '#555', lineHeight: '1.6' }}>
                    Your Order ID is included in the confirmation email sent to you after purchase.
                    You can also find it in your <button onClick={() => navigate('/orders')} style={{ textDecoration: 'underline', border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontWeight: '500' }}>Order History</button> if you are logged in.
                </p>
            </div>
        </div>
    );
};

export default TrackOrder;
