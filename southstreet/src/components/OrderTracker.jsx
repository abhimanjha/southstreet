import { useState, useEffect } from 'react';
import {
    CheckCircle2,
    Package,
    Truck,
    MapPin,
    CreditCard,
    Clock,
    AlertCircle
} from 'lucide-react';
import { ordersAPI } from '../services/api';

const OrderTracker = ({ orderId, initialOrder = null, onOrderUpdate }) => {
    const [order, setOrder] = useState(initialOrder);
    const [loading, setLoading] = useState(!initialOrder);
    const [error, setError] = useState(null);

    // Polling logic
    useEffect(() => {
        let intervalId;

        const fetchOrder = async () => {
            try {
                // Silent update if we already have data
                if (!order) setLoading(true);

                const response = await ordersAPI.getById(orderId);
                if (response.data.success) {
                    const newOrderData = response.data.data;
                    setOrder(newOrderData);
                    if (onOrderUpdate) onOrderUpdate(newOrderData);
                }
            } catch (err) {
                console.error('Error polling order:', err);
                if (!order) setError('Failed to load order status');
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch if needed
        if (!initialOrder) {
            fetchOrder();
        }

        // Poll every 30 seconds
        intervalId = setInterval(fetchOrder, 30000);

        return () => clearInterval(intervalId);
    }, [orderId, initialOrder, onOrderUpdate]);

    if (loading) return <div className="p-4 text-center text-gray-500">Loading tracking info...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
    if (!order) return null;

    // Define steps based on status
    const steps = [
        { status: 'pending', label: 'Order Placed', icon: Clock },
        { status: 'processing', label: 'Processing', icon: Package },
        { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
        { status: 'delivered', label: 'Delivered', icon: MapPin }
    ];

    // Determine current active step index
    // Note: status might be 'shipped' which maps to between processing and out_for_delivery or just processing depending on simplicity
    // Let's map normalized statuses
    const getStepIndex = (status) => {
        switch (status) {
            case 'pending': return 0;
            case 'confirm': return 0; // Treat as placed/confirmed
            case 'processing': return 1;
            case 'shipped': return 2; // Shipped is effectively on way, could be step 2
            case 'out_for_delivery': return 2;
            case 'delivered': return 3;
            default: return 0;
        }
    };

    const currentStepIndex = getStepIndex(order.status);
    const isCancelled = order.status === 'cancelled';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Order Status
                    </h3>
                    <p className="text-sm text-gray-500">
                        Estimated Delivery: {new Date(new Date(order.createdAt).setDate(new Date(order.createdAt).getDate() + 5)).toLocaleDateString()}
                    </p>
                </div>

                {/* Payment Badge */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${order.paymentStatus === 'paid'
                    ? 'bg-green-50 border-green-100 text-green-700'
                    : 'bg-yellow-50 border-yellow-100 text-yellow-700'
                    }`}>
                    <CreditCard size={16} />
                    {order.paymentStatus === 'paid' ? 'Payment Received' : 'Pay on Delivery'}
                </div>
            </div>

            {/* Delivery OTP Display */}
            {order.status === 'out_for_delivery' && order.deliveryOTP && (
                <div className="mb-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <p className="text-blue-800 text-sm font-medium mb-2">Share this OTP with the delivery agent</p>
                    <div className="text-3xl font-mono font-bold tracking-widest text-blue-900 bg-white px-6 py-2 rounded border border-blue-200 shadow-sm">
                        {order.deliveryOTP}
                    </div>
                </div>
            )}

            {isCancelled ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle />
                    <div>
                        <p className="font-semibold">Order Cancelled</p>
                        <p className="text-sm opacity-90">This order has been cancelled.</p>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    {/* Progress Bar Background */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full" />

                    {/* Active Progress Bar */}
                    <div
                        className="hidden md:block absolute top-1/2 left-0 h-1 bg-black -translate-y-1/2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    />

                    {/* Steps */}
                    <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                        {steps.map((step, index) => {
                            const isActive = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            const Icon = step.icon;

                            return (
                                <div key={step.status} className="flex md:flex-col items-center gap-4 md:gap-3 group">
                                    {/* Icon Circle */}
                                    <div className={`
                                        w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                        ${isActive
                                            ? 'bg-black border-black text-white shadow-lg scale-110'
                                            : 'bg-white border-gray-200 text-gray-300'
                                        }
                                    `}>
                                        {isActive ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                                    </div>

                                    {/* Label */}
                                    <div className="md:text-center">
                                        <p className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                            {step.label}
                                        </p>
                                        {isCurrent && (
                                            <p className="text-xs text-black font-medium mt-0.5 animate-pulse">
                                                In Progress
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTracker;
