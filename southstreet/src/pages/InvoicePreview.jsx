import React from 'react';
import Invoice from '../components/Invoice';

const InvoicePreview = () => {
    // Sample order data for demonstration
    const sampleOrderData = {
        invoiceNumber: 'INV-2026-0234',
        orderNumber: 'ORD-2026-0234',
        invoiceDate: '11/02/2026',
        orderDate: '10/02/2026',

        billingAddress: {
            name: 'Priya Sharma',
            address: '45, Koramangala 4th Block',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560034',
            phone: '+91 98765 43210',
            email: 'priya.sharma@example.com'
        },

        shippingAddress: {
            name: 'Priya Sharma',
            address: '45, Koramangala 4th Block',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560034',
            phone: '+91 98765 43210'
        },

        items: [
            {
                id: 1,
                name: 'Oversized Graphic T-Shirt',
                sku: 'SS-TS-089-WHT-XL',
                size: 'XL',
                color: 'White',
                quantity: 2,
                price: 1499,
                amount: 2998
            },
            {
                id: 2,
                name: 'High-Waist Mom Jeans',
                sku: 'SS-JN-156-BLU-30',
                size: '30',
                color: 'Light Blue',
                quantity: 1,
                price: 2799,
                amount: 2799
            },
            {
                id: 3,
                name: 'Cropped Bomber Jacket',
                sku: 'SS-JK-034-BLK-M',
                size: 'M',
                color: 'Black',
                quantity: 1,
                price: 3499,
                amount: 3499
            },
            {
                id: 4,
                name: 'Cotton Ankle Socks (Pack of 3)',
                sku: 'SS-AC-012-MIX-OS',
                size: 'One Size',
                color: 'Mixed',
                quantity: 1,
                price: 399,
                amount: 399
            }
        ],

        subtotal: 9695,
        discount: 970,
        shippingCharges: 0,
        cgst: 436.25,
        sgst: 436.25,
        igst: 0,
        totalAmount: 9597.50,

        paymentMethod: 'Online Payment (Razorpay)',
        paymentStatus: 'Paid'
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            {/* Print Button - Hidden during print */}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000
            }} className="no-print">
                <button
                    onClick={handlePrint}
                    style={{
                        background: '#000',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                    </svg>
                    Print Invoice
                </button>
            </div>

            {/* Invoice Component */}
            <Invoice orderData={sampleOrderData} />

            {/* Print-specific styles */}
            <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
};

export default InvoicePreview;
