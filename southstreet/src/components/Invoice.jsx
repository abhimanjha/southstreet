import React from 'react';
import './Invoice.css';

const Invoice = ({ orderData }) => {
    // Sample data structure - replace with actual order data
    const invoiceData = orderData || {
        invoiceNumber: 'INV-2026-0001',
        orderNumber: 'ORD-2026-0001',
        invoiceDate: new Date().toLocaleDateString('en-IN'),
        orderDate: new Date().toLocaleDateString('en-IN'),

        // Billing Address
        billingAddress: {
            name: 'John Doe',
            address: '123, MG Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            phone: '+91 98765 43210',
            email: 'john.doe@example.com'
        },

        // Shipping Address
        shippingAddress: {
            name: 'John Doe',
            address: '123, MG Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            phone: '+91 98765 43210'
        },

        // Products
        items: [
            {
                id: 1,
                name: 'Premium Cotton T-Shirt',
                sku: 'SS-TS-001-BLK-L',
                size: 'L',
                color: 'Black',
                quantity: 2,
                price: 1299,
                amount: 2598
            },
            {
                id: 2,
                name: 'Slim Fit Denim Jeans',
                sku: 'SS-JN-045-BLU-32',
                size: '32',
                color: 'Blue',
                quantity: 1,
                price: 2499,
                amount: 2499
            },
            {
                id: 3,
                name: 'Casual Hoodie',
                sku: 'SS-HD-023-GRY-M',
                size: 'M',
                color: 'Grey',
                quantity: 1,
                price: 1899,
                amount: 1899
            }
        ],

        // Pricing
        subtotal: 6996,
        discount: 700,
        shippingCharges: 0,
        cgst: 314.80,
        sgst: 314.80,
        igst: 0,
        totalAmount: 6925.60,

        // Payment
        paymentMethod: 'Online Payment (Razorpay)',
        paymentStatus: 'Paid'
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    return (
        <div className="invoice-container">
            <div className="invoice-wrapper">
                {/* Header */}
                <div className="invoice-header">
                    <div className="brand-section">
                        <h1 className="brand-name">SouthStreet</h1>
                        <p className="brand-tagline">Premium Fashion Clothing</p>
                        <div className="company-details">
                            <p>SouthStreet Fashion Pvt. Ltd.</p>
                            <p>456, Fashion Street, Indiranagar</p>
                            <p>Bangalore, Karnataka - 560038</p>
                            <p>GSTIN: 29AABCS1234F1Z5</p>
                            <p>Email: support@southstreet.com</p>
                            <p>Phone: +91 80 1234 5678</p>
                        </div>
                    </div>
                    <div className="invoice-meta">
                        <h2 className="invoice-title">TAX INVOICE</h2>
                        <div className="meta-details">
                            <div className="meta-row">
                                <span className="meta-label">Invoice No:</span>
                                <span className="meta-value">{invoiceData.invoiceNumber}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Invoice Date:</span>
                                <span className="meta-value">{invoiceData.invoiceDate}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Order No:</span>
                                <span className="meta-value">{invoiceData.orderNumber}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Order Date:</span>
                                <span className="meta-value">{invoiceData.orderDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                {/* Addresses */}
                <div className="address-section">
                    <div className="address-block">
                        <h3 className="address-title">Billing Address</h3>
                        <div className="address-content">
                            <p className="customer-name">{invoiceData.billingAddress.name}</p>
                            <p>{invoiceData.billingAddress.address}</p>
                            <p>{invoiceData.billingAddress.city}, {invoiceData.billingAddress.state}</p>
                            <p>PIN: {invoiceData.billingAddress.pincode}</p>
                            <p>Phone: {invoiceData.billingAddress.phone}</p>
                            <p>Email: {invoiceData.billingAddress.email}</p>
                        </div>
                    </div>
                    <div className="address-block">
                        <h3 className="address-title">Shipping Address</h3>
                        <div className="address-content">
                            <p className="customer-name">{invoiceData.shippingAddress.name}</p>
                            <p>{invoiceData.shippingAddress.address}</p>
                            <p>{invoiceData.shippingAddress.city}, {invoiceData.shippingAddress.state}</p>
                            <p>PIN: {invoiceData.shippingAddress.pincode}</p>
                            <p>Phone: {invoiceData.shippingAddress.phone}</p>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                {/* Products Table */}
                <div className="products-section">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th className="col-sno">S.No</th>
                                <th className="col-product">Product Details</th>
                                <th className="col-sku">SKU</th>
                                <th className="col-qty">Qty</th>
                                <th className="col-price">Price</th>
                                <th className="col-amount">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        <div className="product-name">{item.name}</div>
                                        <div className="product-variant">
                                            Size: {item.size} | Color: {item.color}
                                        </div>
                                    </td>
                                    <td className="text-muted">{item.sku}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-right">{formatCurrency(item.price)}</td>
                                    <td className="text-right font-medium">{formatCurrency(item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="divider"></div>

                {/* Summary Section */}
                <div className="summary-section">
                    <div className="summary-left">
                        <div className="payment-info">
                            <h4>Payment Information</h4>
                            <p><strong>Method:</strong> {invoiceData.paymentMethod}</p>
                            <p><strong>Status:</strong> <span className="status-paid">{invoiceData.paymentStatus}</span></p>
                        </div>
                    </div>
                    <div className="summary-right">
                        <div className="summary-row">
                            <span className="summary-label">Subtotal:</span>
                            <span className="summary-value">{formatCurrency(invoiceData.subtotal)}</span>
                        </div>
                        {invoiceData.discount > 0 && (
                            <div className="summary-row discount-row">
                                <span className="summary-label">Discount:</span>
                                <span className="summary-value">- {formatCurrency(invoiceData.discount)}</span>
                            </div>
                        )}
                        <div className="summary-row">
                            <span className="summary-label">Shipping Charges:</span>
                            <span className="summary-value">
                                {invoiceData.shippingCharges === 0 ? 'FREE' : formatCurrency(invoiceData.shippingCharges)}
                            </span>
                        </div>
                        <div className="divider-thin"></div>
                        <div className="summary-row">
                            <span className="summary-label">CGST (5%):</span>
                            <span className="summary-value">{formatCurrency(invoiceData.cgst)}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">SGST (5%):</span>
                            <span className="summary-value">{formatCurrency(invoiceData.sgst)}</span>
                        </div>
                        {invoiceData.igst > 0 && (
                            <div className="summary-row">
                                <span className="summary-label">IGST (10%):</span>
                                <span className="summary-value">{formatCurrency(invoiceData.igst)}</span>
                            </div>
                        )}
                        <div className="divider-thin"></div>
                        <div className="summary-row total-row">
                            <span className="summary-label">Total Amount:</span>
                            <span className="summary-value">{formatCurrency(invoiceData.totalAmount)}</span>
                        </div>
                    </div>
                </div>

                <div className="divider"></div>

                {/* Footer */}
                <div className="invoice-footer">
                    <div className="footer-notes">
                        <h4>Terms & Conditions:</h4>
                        <ul>
                            <li>Goods once sold cannot be returned or exchanged.</li>
                            <li>Returns accepted within 7 days with original tags and packaging.</li>
                            <li>For any queries, contact our customer support.</li>
                        </ul>
                    </div>
                    <div className="footer-signature">
                        <div className="signature-box">
                            <p className="signature-label">Authorized Signatory</p>
                            <p className="company-name">SouthStreet Fashion Pvt. Ltd.</p>
                        </div>
                    </div>
                </div>

                {/* Print Footer */}
                <div className="print-footer">
                    <p>This is a computer-generated invoice and does not require a physical signature.</p>
                    <p>Thank you for shopping with SouthStreet!</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
