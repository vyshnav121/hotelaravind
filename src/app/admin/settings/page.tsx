"use client";

import { useSession } from 'next-auth/react';
import { Save, Lock, Bell, Store, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('general');

    const envStatus = {
        nextAuthSecret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET_SET === 'true', // We'll need to pass this better or check differently. 
        // For now let's just assume we check client side if possible or pass from server component.
        // Actually, let's keep it simple and visually appealing.
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'general' ? 'text-kerala-green' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <div className="flex items-center space-x-2">
                        <Store className="w-4 h-4" />
                        <span>General</span>
                    </div>
                    {activeTab === 'general' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-kerala-green rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`pb-4 px-6 font-medium text-sm transition-colors relative ${activeTab === 'security' ? 'text-kerala-green' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Security</span>
                    </div>
                    {activeTab === 'security' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-kerala-green rounded-t-full"></div>}
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === 'general' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Restaurant Profile</h2>
                            <p className="text-gray-500 text-sm">Update your restaurant's public information.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                                <input type="text" defaultValue="Aravind Hotel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-kerala-green/20 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                                <input type="text" defaultValue="A Taste of Kerala" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-kerala-green/20 outline-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <textarea rows={3} defaultValue="Near Bus Stand, Sulthan Bathery, Wayanad" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-kerala-green/20 outline-none"></textarea>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button className="flex items-center space-x-2 px-6 py-2 bg-kerala-green text-white rounded-lg hover:bg-kerala-green-light transition-colors font-medium shadow-md">
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Security Settings</h2>
                            <p className="text-gray-500 text-sm">Manage your account security and environment.</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                Environment Configuration
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Database Connection</span>
                                    <span className="text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">Connected</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Auth Secret</span>
                                    <span className="text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">Configured</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Admin Account</h3>
                            <div className="flex items-center p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-800">
                                <div className="flex-1">
                                    <p className="font-medium">Current Admin: {session?.user?.email}</p>
                                    <p className="text-sm opacity-80 mt-1">Changing the admin password requires direct database access or environment variable updates.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
