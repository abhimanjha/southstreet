
import React from 'react';

const SizeGuide = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-light-grey)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Size Guide</h2>
                    <p className="section-subtitle">Find your perfect fit.</p>
                </div>

                <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center' }}>
                    <div className="image-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800" alt="Size Guide" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="text-content">
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Men's Sizing</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--color-medium-grey)' }}>
                                        <th style={{ textAlign: 'left', padding: '10px' }}>Size</th>
                                        <th style={{ textAlign: 'left', padding: '10px' }}>Chest (in)</th>
                                        <th style={{ textAlign: 'left', padding: '10px' }}>Waist (in)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid var(--color-soft-grey)' }}>
                                        <td style={{ padding: '10px' }}>S</td>
                                        <td style={{ padding: '10px' }}>36-38</td>
                                        <td style={{ padding: '10px' }}>29-31</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--color-soft-grey)' }}>
                                        <td style={{ padding: '10px' }}>M</td>
                                        <td style={{ padding: '10px' }}>39-41</td>
                                        <td style={{ padding: '10px' }}>32-34</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--color-soft-grey)' }}>
                                        <td style={{ padding: '10px' }}>L</td>
                                        <td style={{ padding: '10px' }}>42-44</td>
                                        <td style={{ padding: '10px' }}>35-37</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '10px' }}>XL</td>
                                        <td style={{ padding: '10px' }}>45-47</td>
                                        <td style={{ padding: '10px' }}>38-40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Women's Sizing</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--color-medium-grey)' }}>
                                        <th style={{ textAlign: 'left', padding: '10px' }}>Size</th>
                                        <th style={{ textAlign: 'left', padding: '10px' }}>Bust (in)</th>
                                        <th style={{ textAlign: 'left', padding: '10px' }}>Waist (in)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid var(--color-soft-grey)' }}>
                                        <td style={{ padding: '10px' }}>S</td>
                                        <td style={{ padding: '10px' }}>33-34</td>
                                        <td style={{ padding: '10px' }}>26-27</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--color-soft-grey)' }}>
                                        <td style={{ padding: '10px' }}>M</td>
                                        <td style={{ padding: '10px' }}>35-36</td>
                                        <td style={{ padding: '10px' }}>28-29</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid var(--color-soft-grey)' }}>
                                        <td style={{ padding: '10px' }}>L</td>
                                        <td style={{ padding: '10px' }}>37-39</td>
                                        <td style={{ padding: '10px' }}>30-31</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SizeGuide;
