"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Search, Filter, ShoppingBag } from 'lucide-react';

const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

function MenuContent() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [menuItems, setMenuItems] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVegOnly, setIsVegOnly] = useState(false);
    const [isNonVegOnly, setIsNonVegOnly] = useState(false);
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const { addToCart } = useCart();

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hours = now.getHours();
            // Open from 11 AM (11) to 11 PM (23)
            // >= 11 and < 23 
            const open = hours >= 11 && hours < 23;
            setIsOpen(open);
        };

        checkTime();
        // Check every minute
        const interval = setInterval(checkTime, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }

        Promise.all([
            fetch('/api/menu-items').then(res => res.json()),
            fetch('/api/categories').then(res => res.json())
        ]).then(([itemsData, categoriesData]) => {
            setMenuItems(itemsData);
            setCategories([{ _id: 'all', name: 'All' }, ...categoriesData]);
            setLoading(false);
        });
    }, [searchParams]);

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesType = true;
        if (isVegOnly && !isNonVegOnly) {
            matchesType = item.isVeg;
        } else if (!isVegOnly && isNonVegOnly) {
            matchesType = !item.isVeg;
        }

        const matchesAvailable = !showAvailableOnly || item.isAvailable;
        return matchesCategory && matchesSearch && matchesType && matchesAvailable;
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-kerala-cream">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kerala-green"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-kerala-cream pt-16 pb-24">
            {/* Header / Hero for Menu */}
            <div className="bg-kerala-green text-white py-16 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-kerala-gold/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3"></div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span className="text-kerala-gold font-serif text-lg italic mb-2 block">Culinary Delights</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Menu</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Explore our carefully curated selection of authentic Kerala dishes, prepared with love and tradition.</p>

                    {!isOpen && (
                        <div className="mt-8 inline-block animate-pulse">
                            <span className="bg-red-500/20 border border-red-500/50 text-red-100 px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                                🔴 Currently Closed • Order hours: 11:00 AM - 11:00 PM
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 sticky top-20 z-30 bg-kerala-cream/95 backdrop-blur-sm py-4 -mx-4 px-4 md:static md:bg-transparent md:p-0">
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-0 bg-kerala-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                        <input
                            type="text"
                            placeholder="Find your craving..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="relative w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-kerala-green/30 focus:border-kerala-green transition-all"
                        />
                    </div>

                    {/* Filter Checkboxes */}
                    <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isVegOnly ? 'bg-green-600 border-green-600' : 'border-gray-300 bg-white group-hover:border-green-500'}`}>
                                {isVegOnly && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <input
                                type="checkbox"
                                checked={isVegOnly}
                                onChange={(e) => {
                                    setIsVegOnly(e.target.checked);
                                    if (e.target.checked) setIsNonVegOnly(false); // Toggle behavior if preferred, or allow both
                                }}
                                className="hidden"
                            />
                            <span className="text-gray-700 font-medium group-hover:text-green-700 transition-colors">Veg</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isNonVegOnly ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white group-hover:border-red-500'}`}>
                                {isNonVegOnly && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <input
                                type="checkbox"
                                checked={isNonVegOnly}
                                onChange={(e) => {
                                    setIsNonVegOnly(e.target.checked);
                                    if (e.target.checked) setIsVegOnly(false); // Toggle behavior
                                }}
                                className="hidden"
                            />
                            <span className="text-gray-700 font-medium group-hover:text-red-700 transition-colors">Non-Veg</span>
                        </label>
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showAvailableOnly ? 'bg-kerala-green border-kerala-green' : 'border-gray-300 bg-white group-hover:border-kerala-green'}`}>
                                {showAvailableOnly && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <input
                                type="checkbox"
                                checked={showAvailableOnly}
                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                                className="hidden"
                            />
                            <span className="text-gray-700 font-medium group-hover:text-kerala-green transition-colors">Available</span>
                        </label>
                    </div>

                    {/* Category Scroll - Desktop */}
                    <div className="hidden md:flex items-center space-x-1 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                        {categories.map(cat => {
                            const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                            return (
                                <button
                                    key={cat._id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-kerala-green text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {toTitleCase(cat.name)}
                                </button>
                            );
                        })}
                    </div>

                    {/* Category Dropdown - Mobile */}
                    <div className="md:hidden w-full relative">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-12 pr-8 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-kerala-green/20 appearance-none"
                        >
                            {categories.map(cat => (
                                <option key={cat._id} value={cat.name}>{toTitleCase(cat.name)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map((item) => (
                        <div key={item._id} className={`bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col h-full ${!item.isAvailable ? 'opacity-75 grayscale-[0.5]' : ''}`}>
                            {/* Image Container */}
                            <div className="relative h-56 bg-gray-100 overflow-hidden">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-300">
                                        <div className="text-center">
                                            <span className="block text-4xl mb-2">🍽️</span>
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                                {/* Sold Out Overlay */}
                                {!item.isAvailable && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                                        <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold tracking-wider transform -rotate-12 border-2 border-white shadow-lg">SOLD OUT</span>
                                    </div>
                                )}

                                {/* Price Tag */}
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                    <span className="text-kerala-green font-bold">₹{item.price}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight group-hover:text-kerala-green transition-colors">{item.name}</h3>
                                    {item.isVeg ? (
                                        <span className="w-4 h-4 rounded-sm border border-green-600 flex items-center justify-center p-[2px] shrink-0 mt-1" title="Vegetarian">
                                            <div className="w-full h-full rounded-full bg-green-600"></div>
                                        </span>
                                    ) : (
                                        <span className="w-4 h-4 rounded-sm border border-red-600 flex items-center justify-center p-[2px] shrink-0 mt-1" title="Non-Vegetarian">
                                            <div className="w-full h-full rounded-full bg-red-600"></div>
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow font-light">{item.description}</p>

                                <button
                                    onClick={() => item.isAvailable && isOpen && addToCart(item)}
                                    disabled={!item.isAvailable || !isOpen}
                                    className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center group/btn border border-gray-100 ${item.isAvailable && isOpen
                                        ? 'bg-gray-50 hover:bg-kerala-green text-gray-700 hover:text-white'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                    <span>
                                        {!isOpen
                                            ? 'Closed (11 AM - 11 PM)'
                                            : item.isAvailable
                                                ? 'Add to Cart'
                                                : 'Unavailable'
                                        }
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-24">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No dishes found</h3>
                        <p className="text-gray-500">Try adjusting your search or category filter.</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-6 text-kerala-green font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function MenuPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-kerala-cream"></div>}>
            <MenuContent />
        </Suspense>
    );
}
