import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, Eye, Download, MoreVertical } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const AdminOrders = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Mock Data
    const [orders, setOrders] = useState([
        { id: '#ORD-7832', customer: 'James Wilson', email: 'james@example.com', date: 'Oct 25, 2023', total: 120.00, items: 2, status: 'Pending' },
        { id: '#ORD-7831', customer: 'Linda Taylor', email: 'linda@example.com', date: 'Oct 25, 2023', total: 850.50, items: 5, status: 'Processing' },
        { id: '#ORD-7830', customer: 'Robert Martinez', email: 'robert@example.com', date: 'Oct 24, 2023', total: 45.00, items: 1, status: 'Shipped' },
        { id: '#ORD-7829', customer: 'Alex Johnson', email: 'alex@example.com', date: 'Oct 24, 2023', total: 145.00, items: 3, status: 'Delivered' },
        { id: '#ORD-7828', customer: 'Sarah Williams', email: 'sarah@example.com', date: 'Oct 24, 2023', total: 290.50, items: 2, status: 'Cancelled' },
        { id: '#ORD-7827', customer: 'Michael Brown', email: 'michael@example.com', date: 'Oct 23, 2023', total: 85.00, items: 1, status: 'Delivered' },
        { id: '#ORD-7826', customer: 'Emily Davis', email: 'emily@example.com', date: 'Oct 23, 2023', total: 450.00, items: 4, status: 'Processing' },
    ]);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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
                        onChange={(e) => setStatusFilter(e.target.value)}
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
                        {currentOrders.map((order) => (
                            <tr
                                key={order.id}
                                style={{ borderBottom: '1px solid #f9f9f9', transition: 'all 0.2s', cursor: 'pointer' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fcfcfc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => navigate(`/admin/orders/${order.id.replace('#', '')}`)}
                            >
                                <td style={{ ...tdStyle, fontWeight: '700', color: '#111' }}>{order.id}</td>
                                <td style={tdStyle}>
                                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{order.customer}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#999' }}>{order.email}</div>
                                </td>
                                <td style={tdStyle}>{order.date}</td>
                                <td style={tdStyle}>{order.items} Items</td>
                                <td style={{ ...tdStyle, fontWeight: '600' }}>{formatCurrency(order.total)}</td>
                                <td style={tdStyle}>
                                    <span style={{
                                        padding: '6px 12px',
                                        borderRadius: '50px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        backgroundColor: getStatusColor(order.status).bg,
                                        color: getStatusColor(order.status).text,
                                        display: 'inline-block',
                                        textAlign: 'center'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate(`/admin/orders/${order.id.replace('#', '')}`); }}
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
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #eee',
                    backgroundColor: '#fff'
                }}>
                    <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                        Showing <b>{indexOfFirstOrder + 1}</b> to <b>{Math.min(indexOfLastOrder, filteredOrders.length)}</b> of <b>{filteredOrders.length}</b> orders
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
    switch (status) {
        case 'Delivered': return { bg: 'rgba(46, 204, 113, 0.12)', text: '#2ecc71' };
        case 'Processing': return { bg: 'rgba(52, 152, 219, 0.12)', text: '#3498db' };
        case 'Shipped': return { bg: 'rgba(241, 196, 15, 0.12)', text: '#f39c12' };
        case 'Pending': return { bg: 'rgba(231, 76, 60, 0.12)', text: '#e74c3c' };
        case 'Cancelled': return { bg: '#f1f2f6', text: '#7f8c8d' };
        default: return { bg: '#f4f4f4', text: '#888' };
    }
};

export default AdminOrders;
