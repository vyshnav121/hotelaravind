"use client";

import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Navigation } from 'lucide-react';

import { useSession } from 'next-auth/react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();
    const { data: session, status } = useSession();
    const [isProcessing, setIsProcessing] = useState(false);

    // Auto-fill effect when session loads
    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user?.name || '',
                email: session.user?.email || ''
            }));
        }
    }, [session]);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        paymentMethod: 'COD'
    });

    // ... existing state and logic ...
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [fetchingLocation, setFetchingLocation] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fetchLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setFetchingLocation(false);
            },
            (error) => {
                console.error("Location error:", error);
                alert("Unable to retrieve your location. Please ensure location services are enabled.");
                setFetchingLocation(false);
            }
        );
    };

    const handleCheckout = async () => {
        if (!formData.name || !formData.phone || !formData.address || !formData.email) {
            alert("Please fill in all billing details.");
            return;
        }

        // Additional safety check
        if (status !== 'authenticated') {
            alert("You must be logged in to place an order.");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create Order in Backend
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                    items: items.map(i => ({ menuItem: i.id, quantity: i.quantity, price: i.price, name: i.name })),
                    totalAmount: total,
                    paymentMethod: formData.paymentMethod,
                    location: location,
                    userEmail: session?.user?.email // Track which user placed it (optional but good)
                })
            });

            const orderData = await res.json();
            if (orderData.error) {
                throw new Error(orderData.error);
            }

            alert(`Order Placed Successfully! Order ID: ${orderData._id}`);
            clearCart();
            router.push('/');
        } catch (error) {
            alert("Order creation failed: " + (error as Error).message);
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-serif font-bold mb-2 text-gray-900">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/menu" className="px-8 py-3 bg-kerala-green text-white font-bold rounded-full hover:bg-kerala-green-light transition-colors shadow-lg">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-kerala-cream py-12 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="font-bold text-lg text-gray-800">Order Items ({items.length})</h2>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {items.map((item) => (
                                    <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50/30 transition-colors">
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                                            )}
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-serif font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                                            <p className="text-kerala-green font-bold">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"><Minus className="w-4 h-4" /></button>
                                                <span className="px-4 font-medium text-gray-900 w-8 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"><Plus className="w-4 h-4" /></button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Item">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Billing Details & Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100 space-y-6 sticky top-24">
                            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-4">Billing Details</h2>

                            {status === 'loading' ? (
                                <div className="py-8 text-center text-gray-500">Checking login status...</div>
                            ) : status === 'unauthenticated' ? (
                                <div className="py-8 text-center space-y-4">
                                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
                                        You must be logged in to place an order.
                                    </div>
                                    <button
                                        onClick={() => router.push('/login?callbackUrl=/cart')}
                                        className="w-full py-3 bg-kerala-gold text-white font-bold rounded-xl hover:bg-white hover:text-kerala-green border-2 border-transparent hover:border-kerala-gold transition-all shadow-lg"
                                    >
                                        Login to Checkout
                                    </button>
                                    <p className="text-sm text-gray-500">
                                        Don't have an account? <Link href="/login" className="text-kerala-green font-bold hover:underline">Sign Up</Link>
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all"
                                                placeholder="John Doe"
                                                disabled // Name comes from profile
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all"
                                                placeholder="john@example.com"
                                                disabled // Email comes from profile
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all resize-none"
                                                placeholder="House No, Street, City, Pincode"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={fetchLocation}
                                            disabled={fetchingLocation}
                                            className={`w-full py-2 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${location ? 'bg-green-50 border-kerala-green text-kerala-green' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {fetchingLocation ? (
                                                <div className="h-4 w-4 border-2 border-kerala-green border-t-transparent rounded-full animate-spin"></div>
                                            ) : location ? (
                                                <>
                                                    <Navigation className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Location Captured!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Share Live Location</span>
                                                </>
                                            )}
                                        </button>

                                        {/* Payment Method Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                            <div className="p-4 border border-kerala-green/30 bg-green-50 rounded-xl flex items-center gap-3 text-kerala-green">
                                                <Banknote className="w-6 h-6" />
                                                <span className="font-medium text-sm">Cash on Delivery</span>
                                                <input type="hidden" name="paymentMethod" value="COD" />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2"> Online payment is currently disabled.</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4 space-y-3">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>₹{total}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Delivery Fee</span>
                                            <span className="text-green-600">Free</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                            <span className="text-xl font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-kerala-green">₹{total}</span>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={handleCheckout}
                                                disabled={isProcessing}
                                                className="w-full py-4 bg-kerala-gold text-white font-bold rounded-xl hover:bg-white hover:text-kerala-green border-2 border-transparent hover:border-kerala-gold transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isProcessing ? (
                                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="w-5 h-5" />
                                                        <span>Place Order</span>
                                                    </>
                                                )}
                                            </button>
                                            <p className="text-xs text-center text-gray-400 mt-3">
                                                By placing an order, you agree to our Terms of Service.
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
