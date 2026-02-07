export const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300';
    if (path.startsWith('http')) return path;

    // Base URL should be the server root, not the /api endpoint
    const baseUrl = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'http://localhost:5000';

    // Remove leading slash from path if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    return `${baseUrl}/${cleanPath}`;
};
