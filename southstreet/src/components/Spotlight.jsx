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

    // Duplicate items to create seamless loop
    const carouselItems = [...spotlightItems, ...spotlightItems, ...spotlightItems];

    return (
        <section className="spotlight-section" style={{ padding: '60px 0', textAlign: 'center', backgroundColor: '#fff', overflow: 'hidden' }}>
            <h2 style={{
                fontFamily: 'impact, sans-serif',
                fontSize: '48px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '40px',
                color: '#111',
                padding: '0 20px'
            }}>
                SPOTLIGHT
            </h2>

            <div className="infinite-scroll-container">
                <div className="infinite-scroll-track">
                    {carouselItems.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="spotlight-item"
                            onClick={() => navigate('/shop')}
                        >
                            <div className="image-container">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                />
                            </div>
                            <h3>{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .infinite-scroll-container {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .infinite-scroll-track {
                    display: flex;
                    gap: 20px;
                    width: max-content;
                    animation: scroll 30s linear infinite;
                }

                .spotlight-item {
                    width: 280px;
                    flex-shrink: 0;
                    cursor: pointer;
                    text-align: center;
                    transition: transform 0.3s ease;
                }

                .spotlight-item:hover {
                    transform: translateY(-5px);
                }

                .image-container {
                    width: 100%;
                    aspect-ratio: 1/1;
                    overflow: hidden;
                    margin-bottom: 10px;
                    background-color: #f5f5f5;
                }

                .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .spotlight-item:hover .image-container img {
                    transform: scale(1.05);
                }

                h3 {
                    font-size: 16px;
                    font-weight: 600;
                    color: #111;
                    margin: 0;
                    text-transform: uppercase;
                }

                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-33.333% - 6.66px)); 
                        /* 
                           We have 3 sets of items. We want to scroll by 1/3 of the total width.
                           However, 'gap' complicates exact percentage.
                           A simpler approach for perfect loop logic usually involves duplicating content enough times 
                           and moving by -50% if duplicated once, or -33.33% if duplicated twice (total 3 sets).
                           Let's rely on standard calc(-100% / 3) approximately, or refine if needed.
                           
                           Actually, standard way:
                           Move by -(width of one set + gap * items count).
                           
                           Improvement: Let's use two identical sets and translate -50%.
                        */
                        transform: translateX(-33.33%);
                    }
                }

                /* Mobile Adjustments */
                @media (max-width: 600px) {
                    .spotlight-section h2 {
                        font-size: 36px !important;
                        margin-bottom: 30px !important;
                    }
                    .spotlight-item {
                        width: 220px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Spotlight;
