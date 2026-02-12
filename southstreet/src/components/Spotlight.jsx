import React from 'react';
import { useNavigate } from 'react-router-dom';

const Spotlight = () => {
    const navigate = useNavigate();

    const spotlightItems = [
        { id: 1, name: 'Graphic Tees', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop&q=60' },
        { id: 2, name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556906781-9a412961d289?w=400&auto=format&fit=crop&q=60' },
        { id: 3, name: 'Cargo Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&auto=format&fit=crop&q=60' },
        { id: 4, name: 'Puffers', image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=400&auto=format&fit=crop&q=60' },
        { id: 7, name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=60' },
        { id: 8, name: 'Denim', image: 'https://images.unsplash.com/photo-1542272617-08f08630329f?w=400&auto=format&fit=crop&q=60' },
        { id: 9, name: 'Varsity', image: 'https://images.unsplash.com/photo-1551028919-ac66c5e3362a?w=400&auto=format&fit=crop&q=60' },
        { id: 13, name: 'Oversized', image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=400&auto=format&fit=crop&q=60' },
    ];

    return (
        <section className="spotlight-section" style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#fff' }}>
            <h2 style={{
                fontFamily: 'impact, sans-serif',
                fontSize: '48px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '40px',
                color: '#111'
            }}>
                SPOTLIGHT
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {spotlightItems.map((item) => (
                    <div
                        key={item.id}
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => navigate('/shop')}
                    >
                        <div style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            overflow: 'hidden',
                            marginBottom: '10px'
                        }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111',
                            margin: 0,
                            textTransform: 'uppercase'
                        }}>
                            {item.name}
                        </h3>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .spotlight-section div[style*="gridTemplateColumns"] {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                }
                @media (max-width: 768px) {
                    .spotlight-section div[style*="gridTemplateColumns"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 600px) {
                    .spotlight-section h2 {
                        font-size: 36px !important;
                        margin-bottom: 30px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Spotlight;
