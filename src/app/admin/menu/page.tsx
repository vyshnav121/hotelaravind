/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Filter, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function MenuPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/menu-items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        console.log(`[MENU DELETE] Attempting to delete item with ID:`, id);
        if (!id) {
            console.error(`[MENU DELETE] ABORTING: ID IS UNDEFINED`);
            alert('Error: Item ID is missing');
            return;
        }
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                const url = `/api/menu-items/${id}`;
                console.log(`[MENU DELETE] Fetching: ${url}`);
                const res = await fetch(url, {
                    method: 'DELETE',
                });
                console.log(`[MENU DELETE] Response status: ${res.status}`);
                if (res.ok) {
                    setItems(items.filter((item) => item._id !== id));
                } else {
                    const errorData = await res.json();
                    console.error(`[MENU DELETE] Error response:`, errorData);
                    alert(errorData.error || 'Failed to delete item');
                }
            } catch (err) {
                console.error(`[MENU DELETE] Fetch error:`, err);
                alert('An error occurred while deleting the item');
            }
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
                    <h1 className="text-3xl font-serif font-bold text-gray-800">Menu Items</h1>
                    <p className="text-gray-500 mt-1">Curate your culinary offerings.</p>
                </div>
                <Link
                    href="/admin/menu/new"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-kerala-green text-white rounded-xl hover:bg-kerala-green-light transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add New Item</span>
                </Link>
            </div>

            {/* Filters & Search - Visual Only for now */}
            <div className="flex space-x-3 mb-6">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search menu..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-kerala-green/20 w-full shadow-sm font-sans"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-16 w-16 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-300">
                                                <ImageIcon className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-bold text-gray-900 text-lg font-serif">{item.name}</div>
                                    <div className="text-gray-500 text-sm truncate max-w-xs">{item.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-kerala-sand text-kerala-green border border-kerala-gold/20">
                                        {item.category?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={async () => {
                                            const newStatus = !item.isVeg;
                                            // Optimistic update
                                            setItems(items.map(i => i._id === item._id ? { ...i, isVeg: newStatus } : i));

                                            try {
                                                await fetch(`/api/menu-items/${item._id}`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ isVeg: newStatus }),
                                                });
                                            } catch (error) {
                                                console.error('Failed to update type', error);
                                                // Revert on error
                                                setItems(items.map(i => i._id === item._id ? { ...i, isVeg: !newStatus } : i));
                                            }
                                        }}
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md cursor-pointer transition-colors border ${item.isVeg
                                                ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
                                                : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
                                            }`}
                                    >
                                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={async () => {
                                            const newStatus = !item.isAvailable;
                                            // Optimistic update
                                            setItems(items.map(i => i._id === item._id ? { ...i, isAvailable: newStatus } : i));

                                            try {
                                                await fetch(`/api/menu-items/${item._id}`, {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ isAvailable: newStatus }),
                                                });
                                            } catch (error) {
                                                console.error('Failed to update status', error);
                                                // Revert on error
                                                setItems(items.map(i => i._id === item._id ? { ...i, isAvailable: !newStatus } : i));
                                            }
                                        }}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${item.isAvailable
                                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                                            }`}
                                    >
                                        {item.isAvailable ? 'Available' : 'Sold Out'}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    ₹{item.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/menu/${item._id}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                    No items found. Click "Add New Item" to start.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
