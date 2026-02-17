/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', order: 0 });

    const fetchCategories = async () => {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            fetchCategories();
            setIsModalOpen(false);
            setFormData({ name: '', order: 0 });
        }
    };

    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchCategories();
                setConfirmDeleteId(null);
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('An error occurred while deleting the category');
        } finally {
            setDeletingId(null);
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
                    <h1 className="text-3xl font-serif font-bold text-gray-800">Categories</h1>
                    <p className="text-gray-500 mt-1">Organize your menu structure.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-kerala-green text-white rounded-xl hover:bg-kerala-green-light transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Category</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category._id} className={`bg-white p-6 rounded-2xl shadow-card border border-gray-100 hover:shadow-lg transition-all group relative overflow-hidden ${deletingId === category._id ? 'opacity-50 grayscale' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-12 w-12 rounded-xl bg-kerala-sand flex items-center justify-center text-kerala-green font-bold text-xl font-serif">
                                {category.name.charAt(0)}
                            </div>

                            {confirmDeleteId === category._id ? (
                                <div className="flex items-center space-x-2 animate-in fade-in slide-in-from-right-2">
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors font-medium"
                                    >
                                        Sure?
                                    </button>
                                    <button
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setConfirmDeleteId(category._id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        disabled={deletingId !== null}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-500">Slug: <span className="font-mono bg-gray-50 px-1 rounded">{category.slug}</span></p>

                        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                            <span className="text-gray-400">Sort Order</span>
                            <span className="font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{category.order}</span>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-kerala-gold/5 rounded-full blur-xl group-hover:bg-kerala-gold/10 transition-colors"></div>

                        {deletingId === category._id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-red-600 border-t-transparent"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-800 font-serif">Add Category</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all"
                                    placeholder="e.g. Starters"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="pt-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center space-x-2 px-6 py-2 bg-kerala-green text-white rounded-lg hover:bg-kerala-green-light transition-colors shadow-lg hover:shadow-xl font-medium"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Save Category</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
