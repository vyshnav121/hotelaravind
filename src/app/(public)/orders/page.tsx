"use client";

import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function MyOrdersPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Out for Delivery': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-kerala-cream pt-24 pb-12 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-kerala-green"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-kerala-cream pt-24 pb-12 px-4">
                <div className="max-w-3xl mx-auto text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">No Orders Yet</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't placed any orders yet.</p>
                    <Link href="/menu" className="px-8 py-3 bg-kerala-green text-white font-bold rounded-full hover:bg-kerala-green-light transition-colors shadow-lg inline-flex items-center gap-2">
                        Browse Menu <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-kerala-cream pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <Package className="w-8 h-8 text-kerala-green" />
                    My Orders
                </h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-gray-900">Order #{order._id.substring(0, 8)}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                        <p className="text-2xl font-bold text-kerala-green">₹{order.totalAmount}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {order.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium text-gray-600">
                                                    {item.quantity}x
                                                </span>
                                                <span className="text-gray-800 font-medium">{item.name}</span>
                                            </div>
                                            <span className="text-gray-600">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                {order.status === 'Out for Delivery' && (
                                    <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
                                        <div className="p-2 bg-yellow-100 rounded-full text-yellow-600 shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-yellow-800 text-sm">Out for Delivery!</p>
                                            <p className="text-yellow-700 text-xs mt-1">Your order is on the way. Please be ready to receive it.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
