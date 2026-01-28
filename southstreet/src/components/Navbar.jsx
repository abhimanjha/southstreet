import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);
    const totalItems = getTotalCartItems();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">SOUTHSTREET</Link>

                <ul className="navbar-links">
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/men">Men</Link></li>
                    <li><Link to="/women">Women</Link></li>
                    <li><Link to="/collections">Collections</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>

                <div className="navbar-actions">
                    <Link to="/search">
                        <svg className="navbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </Link>
                    <Link to="/cart" style={{ position: 'relative' }}>
                        <svg className="navbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {totalItems > 0 && <span className="cart-badge" style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>{totalItems}</span>}
                    </Link>
                    <Link to="/login">
                        <svg className="navbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

