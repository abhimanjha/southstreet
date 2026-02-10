// Authentication helper functions

// Regular User Token
export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const removeAuthToken = () => {
    localStorage.removeItem('token');
};

// Admin Token
export const setAdminToken = (token) => {
    localStorage.setItem('adminToken', token);
};

export const getAdminToken = () => {
    return localStorage.getItem('adminToken');
};

export const removeAdminToken = () => {
    localStorage.removeItem('adminToken');
};

// Smart Token Retrieval based on context
export const getToken = () => {
    // If we are in admin section, prefer admin token
    if (window.location.pathname.startsWith('/admin')) {
        return getAdminToken() || getAuthToken();
    }
    // Otherwise prefer user token
    return getAuthToken();
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
    localStorage.removeItem('user');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const isAdminAuthenticated = () => {
    return !!getAdminToken();
};

export const isAdmin = () => {
    // Check if we have an admin token first
    if (getAdminToken()) return true;

    // Fallback to checking user role in localStorage (legacy/simple check)
    const user = getUser();
    return user?.role === 'admin';
};

export const logout = () => {
    // If in admin section, only logout admin
    if (window.location.pathname.startsWith('/admin')) {
        removeAdminToken();
        // Redirect to admin login
        window.location.href = '/admin/login';
    } else {
        // User logout
        removeAuthToken();
        removeUser();
        // Redirect to home
        window.location.href = '/';
    }
};

export const logoutAll = () => {
    removeAuthToken();
    removeUser();
    removeAdminToken();
    window.location.href = '/';
};

// Session ID for guest cart
export const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = generateUUID();
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

// Simple UUID generator
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
