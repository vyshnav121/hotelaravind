"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ShoppingBag, UtensilsCrossed, IndianRupee, TrendingUp, Clock, CheckCircle, Menu as MenuIcon } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { data: session } = useSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [stats, setStats] = useState<any>({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        menuItems: 0
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    useEffect(() => {
        // Fetch stats
        fetch('/api/orders').then(res => res.json()).then(data => {
            if (Array.isArray(data)) {
                const totalRevenue = data.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
                const pendingOrders = data.filter(o => o.status === 'Pending').length;
                setStats((prev: any) => ({ ...prev, totalOrders: data.length, totalRevenue, pendingOrders }));
                setRecentOrders(data.slice(0, 5));
            }
        });

        fetch('/api/menu-items').then(res => res.json()).then(data => {
            if (Array.isArray(data)) {
                setStats((prev: any) => ({ ...prev, menuItems: data.length }));
            }
        });
    }, []);

    const statCards = [
        { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
        { title: 'Menu Items', value: stats.menuItems, icon: UtensilsCrossed, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back, {session?.user?.name || 'Admin'}</p>
                </div>
                <div className="text-sm text-gray-400 font-medium">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-card hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="font-bold text-gray-800 text-lg">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm text-kerala-green hover:underline font-medium">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                            #{order._id.substring(0, 6)}...
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${order.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        'bg-gray-100 text-gray-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                                            ₹{order.totalAmount}
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                            No recent orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / System Health */}
                <div className="space-y-6">
                    <div className="bg-kerala-green text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-serif font-bold text-2xl mb-2">Quick Actions</h3>
                            <p className="text-white/80 text-sm mb-6">Manage your restaurant efficiently.</p>

                            <div className="space-y-3">
                                <Link href="/admin/menu/new" className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex items-center space-x-3 group">
                                    <div className="bg-kerala-gold p-2 rounded-lg text-kerala-green group-hover:scale-110 transition-transform">
                                        <UtensilsCrossed className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Add Menu Item</span>
                                </Link>
                                <Link href="/admin/categories" className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex items-center space-x-3 group">
                                    <div className="bg-kerala-gold p-2 rounded-lg text-kerala-green group-hover:scale-110 transition-transform">
                                        <MenuIcon className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Manage Categories</span>
                                </Link>
                            </div>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-kerala-gold/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-kerala-gold/10 rounded-full blur-2xl"></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    Database
                                </span>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Online</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    API Server
                                </span>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
