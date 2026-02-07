import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Download, MoreVertical } from 'lucide-react';
import { ordersAPI } from '../../services/api';
import { formatCurrency } from '../../utils/format';

const AdminOrders = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const ordersPerPage = 10;

    useEffect(() => {
        fetchOrders();
    }, [currentPage, statusFilter]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: ordersPerPage
            };

            // Add status filter if not 'All'
            if (statusFilter !== 'All') {
                params.status = statusFilter.toLowerCase();
            }

            const response = await ordersAPI.getAll(params);

            if (response.data.success) {
                setOrders(response.data.data || []);
                setTotalPages(response.data.pagination?.pages || 1);
                setTotalOrders(response.data.pagination?.total || 0);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // Client-side search filter (since backend doesn't support search yet)
    const filteredOrders = orders.filter(order => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        const orderNumber = order.orderNumber?.toLowerCase() || '';
        const customerName = order.user
            ? `${order.user.firstName} ${order.user.lastName}`.toLowerCase()
            : '';
        const email = order.user?.email?.toLowerCase() || '';

        return orderNumber.includes(query) ||
            customerName.includes(query) ||
            email.includes(query);
    });

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '35px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '8px' }}>Orders</h1>
                    <p style={{ color: '#666', margin: 0 }}>View and manage customer orders across all stores.</p>
                </div>
                <button style={{
                    padding: '12px 24px',
                    backgroundColor: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Download size={18} /> Export Orders
                </button>
            </div>

            {/* Filters Bar */}
            <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '25px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #eee',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                        type="text"
                        placeholder="Search by Order ID, customer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 15px 12px 45px',
                            borderRadius: '8px',
                            border: '1px solid #eee',
                            fontSize: '0.9rem',
                            outline: 'none',
                            backgroundColor: '#f8f9fa'
                        }}
                    />
                </div>
                <div style={{ position: 'relative', width: '200px' }}>
                    <Filter size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1); // Reset to first page when filter changes
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 15px 12px 45px',
                            borderRadius: '8px',
                            border: '1px solid #eee',
                            fontSize: '0.9rem',
                            outline: 'none',
                            backgroundColor: '#f8f9fa',
                            appearance: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                            <th style={thStyle}>Order ID</th>
                            <th style={thStyle}>Customer</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Items</th>
                            <th style={thStyle}>Total</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    style={{ borderBottom: '1px solid #f9f9f9', transition: 'all 0.2s', cursor: 'pointer' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fcfcfc'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                                >
                                    <td style={{ ...tdStyle, fontWeight: '700', color: '#111' }}>
                                        #{order.orderNumber}
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                                            {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest'}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#999' }}>
                                            {order.user?.email || 'N/A'}
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td style={tdStyle}>
                                        {order.items?.length || 0} Items
                                    </td>
                                    <td style={{ ...tdStyle, fontWeight: '600' }}>
                                        {formatCurrency(parseFloat(order.totalAmount))}
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '50px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            backgroundColor: getStatusColor(order.status).bg,
                                            color: getStatusColor(order.status).text,
                                            display: 'inline-block',
                                            textAlign: 'center',
                                            textTransform: 'capitalize'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/admin/orders/${order.id}`);
                                                }}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); }}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                                            >
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                    {searchQuery ? 'No orders found matching your search' : 'No orders yet'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {filteredOrders.length > 0 && (
                    <div style={{
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid #eee',
                        backgroundColor: '#fff'
                    }}>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                            Showing <b>{indexOfFirstOrder + 1}</b> to <b>{Math.min(indexOfLastOrder, totalOrders)}</b> of <b>{totalOrders}</b> orders
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                style={{ ...pagiBtnStyle, opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    style={{
                                        ...pagiBtnStyle,
                                        backgroundColor: currentPage === i + 1 ? '#111' : '#fff',
                                        color: currentPage === i + 1 ? '#fff' : '#111',
                                        fontWeight: currentPage === i + 1 ? 600 : 400
                                    }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                style={{ ...pagiBtnStyle, opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const thStyle = {
    padding: '18px 20px',
    color: '#888',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.8px'
};

const tdStyle = {
    padding: '20px',
    fontSize: '0.9rem',
    color: '#333'
};

const pagiBtnStyle = {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
    fontSize: '0.85rem',
    transition: 'all 0.2s',
    cursor: 'pointer'
};

const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
        case 'delivered': return { bg: 'rgba(46, 204, 113, 0.12)', text: '#2ecc71' };
        case 'processing': return { bg: 'rgba(52, 152, 219, 0.12)', text: '#3498db' };
        case 'shipped': return { bg: 'rgba(241, 196, 15, 0.12)', text: '#f39c12' };
        case 'pending': return { bg: 'rgba(231, 76, 60, 0.12)', text: '#e74c3c' };
        case 'cancelled': return { bg: '#f1f2f6', text: '#7f8c8d' };
        default: return { bg: '#f4f4f4', text: '#888' };
    }
};

export default AdminOrders;
