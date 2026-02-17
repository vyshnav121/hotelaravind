/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { Check, X, Truck, Search, Filter, Navigation, Eye } from 'lucide-react';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    const fetchOrders = async () => {
        const res = await fetch('/api/orders');
        if (res.ok) {
            const data = await res.json();
            setOrders(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        const res = await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });

        if (res.ok) {
            fetchOrders();
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-kerala-green"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-800">Orders</h1>
                    <p className="text-gray-500 mt-1">Manage and track customer orders.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kerala-green/20 w-64 shadow-sm font-sans"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Address & Location</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.map((order: any) => (
                            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                    #{order._id.substring(0, 8)}...
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="font-bold">{order.customerName}</div>
                                    <div className="text-gray-500 text-xs mb-1">{order.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 min-w-[200px]">
                                    <div className="text-gray-600 text-xs italic whitespace-normal leading-relaxed mb-2">{order.address}</div>
                                    {order.location && order.location.lat && (
                                        <a
                                            href={`https://www.google.com/maps?q=${order.location.lat},${order.location.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-kerala-green text-white rounded-lg hover:bg-kerala-green-light transition-colors shadow-sm mt-1"
                                        >
                                            <Navigation className="w-3.5 h-3.5" />
                                            <span className="text-[11px] font-bold tracking-wide uppercase">Track Location</span>
                                        </a>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <ul className="space-y-1">
                                        {order.items.map((item: any, idx: number) => (
                                            <li key={idx} className="truncate max-w-xs flex items-center">
                                                <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium mr-2 text-gray-600">
                                                    {item.quantity}
                                                </span>
                                                <span className="text-gray-700">{item.name || 'Item'}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    ₹{order.totalAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                    <span className="block text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border 
                                        ${order.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                            order.status === 'Confirmed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    'bg-gray-50 text-gray-700 border-gray-100'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        {order.status === 'Pending' && (
                                            <button onClick={() => updateStatus(order._id, 'Confirmed')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="Confirm">
                                                <Check className="w-4 h-4" />
                                            </button>
                                        )}
                                        {order.status === 'Confirmed' && (
                                            <button onClick={() => updateStatus(order._id, 'Out for Delivery')} className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors" title="Out for Delivery">
                                                <Truck className="w-4 h-4" />
                                            </button>
                                        )}
                                        {order.status === 'Out for Delivery' && (
                                            <button onClick={() => updateStatus(order._id, 'Completed')} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors" title="Complete">
                                                <Check className="w-4 h-4" />
                                            </button>
                                        )}
                                        {['Pending', 'Confirmed'].includes(order.status) && (
                                            <button onClick={() => updateStatus(order._id, 'Cancelled')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Cancel">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <div className="bg-gray-50 p-4 rounded-full mb-3">
                                            <Search className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-lg font-medium text-gray-500">No orders found</p>
                                        <p className="text-sm">New orders will appear here automatically.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900">Order Details</h2>
                                <p className="text-gray-500 text-sm">#{selectedOrder._id}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Customer & Delivery */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-900 border-b pb-2">Customer Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                                            <p className="font-medium text-gray-900">{selectedOrder.customerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                                            <p className="font-medium text-gray-900">{selectedOrder.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                            <p className="font-medium text-gray-900">{selectedOrder.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-900 border-b pb-2">Delivery Details</h3>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Address</p>
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedOrder.address}</p>
                                    </div>
                                    {selectedOrder.location && selectedOrder.location.lat && (
                                        <div className="mt-4">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Live Location</p>
                                            <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 h-48 w-full bg-gray-100 relative">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    loading="lazy"
                                                    allowFullScreen
                                                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&q=${selectedOrder.location.lat},${selectedOrder.location.lng}`}
                                                ></iframe>
                                                {/* Fallback link if API key is missing or fails */}
                                                <a
                                                    href={`https://www.google.com/maps?q=${selectedOrder.location.lat},${selectedOrder.location.lng}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-kerala-green hover:bg-gray-50 flex items-center gap-2"
                                                >
                                                    <Navigation className="w-3 h-3" />
                                                    Open in Google Maps
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-900 border-b pb-2">Order Items</h3>
                                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                    <table className="w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Item</th>
                                                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase">Qty</th>
                                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">Price</th>
                                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {selectedOrder.items.map((item: any, idx: number) => (
                                                <tr key={idx}>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600 text-right">₹{item.price}</td>
                                                    <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">₹{item.price * item.quantity}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-white border-t-2 border-gray-200">
                                                <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-900 text-right">Grand Total</td>
                                                <td className="px-4 py-3 text-sm font-bold text-kerala-green text-right text-lg">₹{selectedOrder.totalAmount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Status & Payment */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
                                    <span className={`px-3 py-1 inline-flex text-sm font-bold rounded-full border 
                                        ${selectedOrder.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                            selectedOrder.status === 'Confirmed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                selectedOrder.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    'bg-gray-50 text-gray-700 border-gray-100'}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment Method</p>
                                    <p className="font-bold text-gray-900">{selectedOrder.paymentMethod}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
