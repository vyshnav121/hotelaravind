"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
    _id: string;
    name: string;
}

interface MenuItem {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    category: string;
    isVeg: boolean;
    isAvailable: boolean;
}

interface MenuItemFormProps {
    initialData?: MenuItem;
    categories: Category[];
}

export default function MenuItemForm({ initialData, categories }: MenuItemFormProps) {
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        price: string | number;
        image: string;
        category: string;
        isVeg: boolean;
        isAvailable: boolean;
    }>({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        isVeg: false,
        isAvailable: true,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description || '',
                price: initialData.price,
                image: initialData.image || '',
                category: initialData.category,
                isVeg: initialData.isVeg,
                isAvailable: initialData.isAvailable,
            });
        } else if (categories.length > 0) {
            setFormData(prev => ({ ...prev, category: categories[0]._id }));
        }
    }, [initialData, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData
            ? `/api/menu-items/${initialData._id}`
            : '/api/menu-items';

        const method = initialData ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push('/admin/menu');
            router.refresh();
        } else {
            alert('Failed to save item');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-kerala-green outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-kerala-green outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-kerala-green outline-none"
                    >
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-kerala-green outline-none"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-kerala-green outline-none"
                />
            </div>
            <div className="space-y-4">
                {/* Type Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <div className="flex space-x-4">
                        <label className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.isVeg
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-green-200'
                            }`}>
                            <input
                                type="radio"
                                name="isVeg"
                                checked={formData.isVeg}
                                onChange={() => setFormData(prev => ({ ...prev, isVeg: true }))}
                                className="hidden"
                            />
                            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center p-[2px] ${formData.isVeg ? 'border-green-600' : 'border-gray-400'}`}>
                                <div className={`w-full h-full rounded-full ${formData.isVeg ? 'bg-green-600' : 'bg-transparent'}`}></div>
                            </div>
                            <span className="font-medium">Vegetarian</span>
                        </label>

                        <label className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${!formData.isVeg
                                ? 'border-red-500 bg-red-50 text-red-700'
                                : 'border-gray-200 hover:border-red-200'
                            }`}>
                            <input
                                type="radio"
                                name="isVeg"
                                checked={!formData.isVeg}
                                onChange={() => setFormData(prev => ({ ...prev, isVeg: false }))}
                                className="hidden"
                            />
                            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center p-[2px] ${!formData.isVeg ? 'border-red-600' : 'border-gray-400'}`}>
                                <div className={`w-full h-full rounded-full ${!formData.isVeg ? 'bg-red-600' : 'bg-transparent'}`}></div>
                            </div>
                            <span className="font-medium">Non-vegetarian</span>
                        </label>
                    </div>
                </div>

                {/* Availability Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex space-x-4">
                        <label className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.isAvailable
                                ? 'border-kerala-green bg-green-50 text-kerala-green'
                                : 'border-gray-200 hover:border-green-200'
                            }`}>
                            <input
                                type="radio"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={() => setFormData(prev => ({ ...prev, isAvailable: true }))}
                                className="hidden"
                            />
                            <span className="font-medium">Available</span>
                        </label>

                        <label className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${!formData.isAvailable
                                ? 'border-gray-500 bg-gray-100 text-gray-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                            <input
                                type="radio"
                                name="isAvailable"
                                checked={!formData.isAvailable}
                                onChange={() => setFormData(prev => ({ ...prev, isAvailable: false }))}
                                className="hidden"
                            />
                            <span className="font-medium">Sold Out</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-kerala-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Item'}
                </button>
            </div>
        </form>
    );
}
