import { useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { isAuthenticated, getUser, logout } from '../utils/auth';
import LoginModal from './LoginModal';
import { Search, Heart, ShoppingBag, Menu, X, User, Package, LogOut } from 'lucide-react';
import '../App.css'; // Ensure CSS is applied

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { getCartItemsCount } = useContext(ShopContext);
    const totalItems = getCartItemsCount();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const navigate = useNavigate();
    const user = getUser();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleUserIconClick = () => {
        if (isAuthenticated()) {
            navigate('/account');
        } else {
            setIsLoginModalOpen(true);
        }
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <>
            {/* Top Utility Bar */}
            <div className="top-nav">
                <div className="top-nav-container">
                    <span className="top-nav-link">Help</span>
                    <span className="separator">|</span>
                    {isAuthenticated() && user ? (
                        <div className="user-menu-container" ref={dropdownRef}>
                            <div
                                className="top-nav-link user-trigger"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <span>Hi, <strong>{user.firstName || 'User'}</strong></span>
                                <User size={16} className="user-icon-small" />
                            </div>

                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        Hi {user.firstName || 'User'}
                                    </div>
                                    <div className="user-dropdown-links">
                                        <div className="user-dropdown-item" onClick={() => { navigate('/account/orders'); setShowUserMenu(false); }}>
                                            <span>Orders</span>
                                            <Package size={18} />
                                        </div>
                                        <div className="user-dropdown-item" onClick={() => { navigate('/account'); setShowUserMenu(false); }}>
                                            <span>My Profile</span>
                                            <User size={18} />
                                        </div>
                                    </div>
                                    <div className="user-dropdown-footer">
                                        <button className="logout-btn" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <span className="top-nav-link" onClick={() => setIsLoginModalOpen(true)}>Join Us</span>
                            <span className="separator">|</span>
                            <span className="top-nav-link" onClick={() => setIsLoginModalOpen(true)}>Sign In</span>
                        </>
                    )}
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Logo (Left) */}
                    <Link to="/" className="navbar-logo">
                        SOUTHSTREET
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </div>

                    {/* Centered Navigation Links */}
                    <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                        <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
                        <li><Link to="/men" onClick={() => setMenuOpen(false)}>Men</Link></li>
                        <li><Link to="/women" onClick={() => setMenuOpen(false)}>Women</Link></li>
                        <li><Link to="/collections" onClick={() => setMenuOpen(false)}>Collections</Link></li>
                        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
                    </ul>

                    {/* Right Actions: Search, Heart, Bag */}
                    <div className="navbar-actions">
                        <div className="search-pill" onClick={() => navigate('/search')}>
                            <div className="search-icon-wrapper">
                                <Search size={20} color="#111" />
                            </div>
                            <span className="search-placeholder">Search</span>
                        </div>

                        <Link to="/cart" className="icon-btn" style={{ position: 'relative' }}>
                            <ShoppingBag size={24} color="#111" />
                            {totalItems > 0 && (
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </>
    );
}

