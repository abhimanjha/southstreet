
import { useState } from 'react';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Men',
        stock: '',
        image: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...formData, id: Date.now(), price: parseFloat(formData.price), stock: parseInt(formData.stock) });
        onClose();
        setFormData({ name: '', price: '', category: 'Men', stock: '', image: '' });
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>Add New Product</h2>
                    <button onClick={onClose} style={closeButtonStyle}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Product Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Premium Silk Scarf"
                            style={inputStyle}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                placeholder="0.00"
                                style={inputStyle}
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Category</label>
                            <select
                                style={inputStyle}
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Initial Stock</label>
                        <input
                            type="number"
                            required
                            placeholder="0"
                            style={inputStyle}
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Image URL</label>
                        <input
                            type="text"
                            required
                            placeholder="https://images.unsplash.com/..."
                            style={inputStyle}
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <button type="submit" style={submitButtonStyle}>Create Product</button>
                        <button type="button" onClick={onClose} style={cancelButtonStyle}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
};

const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#888'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
};

const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const inputStyle = {
    padding: '12px',
    border: '1px solid #eee',
    borderRadius: '6px',
    fontSize: '0.95rem',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    transition: 'border-color 0.3s'
};

const submitButtonStyle = {
    flex: 2,
    padding: '14px',
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const cancelButtonStyle = {
    flex: 1,
    padding: '14px',
    backgroundColor: '#fff',
    color: '#888',
    border: '1px solid #eee',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
};

export default AddProductModal;
