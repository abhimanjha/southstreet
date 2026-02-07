import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { productsAPI } from '../../services/api';
import { formatCurrency } from '../../utils/format';
import { getImageUrl } from '../../utils/imageUrl';

const AdminProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.getAll({ page: currentPage, limit: 10 });
            setProducts(response.data.data.products || []);
            setTotalPages(response.data.data.pagination?.pages || 1);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await productsAPI.delete(id);
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(error.response?.data?.message || 'Failed to delete product');
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '600' }}>Products</h1>
                <button
                    onClick={() => navigate('/admin/products/add')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                    }}
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem', color: '#6b7280' }}>
                                Product
                            </th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem', color: '#6b7280' }}>
                                SKU
                            </th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem', color: '#6b7280' }}>
                                Category
                            </th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem', color: '#6b7280' }}>
                                Price
                            </th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem', color: '#6b7280' }}>
                                Stock
                            </th>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem', color: '#6b7280' }}>
                                Status
                            </th>
                            <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', fontSize: '0.875rem', color: '#6b7280' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const image = product.images && product.images.length > 0
                                ? product.images[0]
                                : 'https://via.placeholder.com/50';

                            return (
                                <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img
                                                src={getImageUrl(image)}
                                                alt={product.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                                            />
                                            <div>
                                                <p style={{ fontWeight: '500' }}>{product.name}</p>
                                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                                    {product.description?.substring(0, 50)}...
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', color: '#6b7280' }}>{product.sku}</td>
                                    <td style={{ padding: '16px' }}>{product.category?.name || '-'}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div>
                                            <p style={{ fontWeight: '500' }}>{formatCurrency(product.price)}</p>
                                            {product.discountPrice && (
                                                <p style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                                                    {formatCurrency(product.discountPrice)}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            backgroundColor: product.stock < 20 ? '#fee2e2' : '#f3f4f6',
                                            color: product.stock < 20 ? '#dc2626' : '#111',
                                            borderRadius: '12px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            backgroundColor: product.isActive ? '#d1fae5' : '#fee2e2',
                                            color: product.isActive ? '#065f46' : '#dc2626',
                                            borderRadius: '12px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                style={{
                                                    padding: '8px',
                                                    backgroundColor: '#f3f4f6',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                style={{
                                                    padding: '8px',
                                                    backgroundColor: '#fee2e2',
                                                    color: '#dc2626',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                        No products found. Click "Add Product" to create one.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: currentPage === 1 ? '#f3f4f6' : '#fff',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Previous
                    </button>
                    <span style={{ padding: '8px 16px', display: 'flex', alignItems: 'center' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#fff',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
