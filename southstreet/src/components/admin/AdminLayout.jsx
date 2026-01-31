import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    Users,
    Tag,
    Percent,
    BarChart3,
    Settings,
    Bell,
    User,
    LogOut,
    Search,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/products', label: 'Products', icon: ShoppingBag },
        { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/categories', label: 'Categories', icon: Tag },
        { path: '/admin/discounts', label: 'Discounts', icon: Percent },
        { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
        { path: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    const notifications = [
        { id: 1, text: 'New order received #ORD-7829', time: '2 mins ago', type: 'order' },
        { id: 2, text: 'Product "Silk Blend Dress" is out of stock', time: '1 hour ago', type: 'stock' },
        { id: 3, text: 'Payment failed for Order #ORD-7815', time: '3 hours ago', type: 'payment' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Sidebar */}
            <aside style={{
                width: isSidebarOpen ? '260px' : '80px',
                backgroundColor: '#111',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100%',
                left: 0,
                top: 0,
                zIndex: 1000,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflowX: 'hidden'
            }}>
                <div style={{ padding: '25px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center' }}>
                    {isSidebarOpen && (
                        <div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', letterSpacing: '1px', color: '#fff', margin: 0 }}>SOUTHSTREET</h2>
                            <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin Dashboard</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '5px' }}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav style={{ padding: '20px 15px', flex: 1 }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0, margin: 0 }}>
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        color: location.pathname === item.path ? '#fff' : '#999',
                                        backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    <item.icon size={20} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
                                    {isSidebarOpen && <span>{item.label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid #222' }}>
                    <button
                        onClick={() => navigate('/admin/login')}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            background: 'transparent',
                            border: 'none',
                            color: '#999',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{
                marginLeft: isSidebarOpen ? '260px' : '80px',
                flex: 1,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <header style={{
                    height: '70px',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 30px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                style={{
                                    padding: '10px 15px 10px 40px',
                                    borderRadius: '50px',
                                    border: '1px solid #eee',
                                    backgroundColor: '#f8f9fa',
                                    width: '300px',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    transition: 'all 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#111'}
                                onBlur={(e) => e.target.style.borderColor = '#eee'}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Notifications */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', position: 'relative', padding: '8px', borderRadius: '50%', backgroundColor: '#f8f9fa' }}
                            >
                                <Bell size={20} />
                                <span style={{ position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', backgroundColor: '#e74c3c', borderRadius: '50%', border: '2px solid #fff' }}></span>
                            </button>

                            {isNotificationsOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '10px',
                                    width: '320px',
                                    backgroundColor: '#fff',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    border: '1px solid #eee',
                                    padding: '10px 0',
                                    zIndex: 1001
                                }}>
                                    <div style={{ padding: '10px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Notifications</h3>
                                        <button style={{ color: '#007bff', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer' }}>Mark all read</button>
                                    </div>
                                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {notifications.map(n => (
                                            <div key={n.id} style={{ padding: '15px 20px', borderBottom: '1px solid #f9f9f9', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                <p style={{ fontSize: '0.85rem', color: '#333', marginBottom: '5px', margin: 0 }}>{n.text}</p>
                                                <span style={{ fontSize: '0.75rem', color: '#999' }}>{n.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ padding: '10px 20px', textAlign: 'center' }}>
                                        <button style={{ color: '#666', background: 'none', border: 'none', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}>View all notifications</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 10px', borderRadius: '8px', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                                    AD
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        Admin User <ChevronDown size={14} />
                                    </p>
                                    <p style={{ fontSize: '0.75rem', color: '#999', margin: 0 }}>Administrator</p>
                                </div>
                            </button>

                            {isProfileOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '10px',
                                    width: '200px',
                                    backgroundColor: '#fff',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    border: '1px solid #eee',
                                    padding: '8px 0',
                                    zIndex: 1001
                                }}>
                                    <Link to="/admin/profile" style={profileLinkStyle}><User size={16} /> Profile</Link>
                                    <Link to="/admin/change-password" style={profileLinkStyle}><LogOut size={16} /> Change Password</Link>
                                    <Link to="/admin/settings" style={profileLinkStyle}><Settings size={16} /> Settings</Link>
                                    <div style={{ borderTop: '1px solid #eee', margin: '8px 0' }}></div>
                                    <button onClick={() => navigate('/admin/login')} style={{ ...profileLinkStyle, width: '100%', color: '#e74c3c', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer' }}><LogOut size={16} /> Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div style={{ padding: '40px', flex: 1 }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const profileLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 20px',
    fontSize: '0.9rem',
    color: '#333',
    textDecoration: 'none',
    transition: 'all 0.2s',
};

export default AdminLayout;
