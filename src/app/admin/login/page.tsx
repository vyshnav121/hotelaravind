"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ChefHat } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            role: 'admin',
        });

        if (result?.error) {
            setError('Invalid email or password');
            setLoading(false);
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-kerala-green relative overflow-hidden">
            {/* Background Pattern/Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-black/20 to-transparent"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-kerala-gold/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-kerala-gold/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md p-4">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4 border border-white/20 shadow-xl">
                        <ChefHat className="w-8 h-8 text-kerala-gold" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-white mb-2 tracking-wide">Aravind Hotel</h1>
                    <p className="text-white/70">Admin Access Portal</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-100 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="w-5 h-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-kerala-gold transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-kerala-gold/50 focus:border-transparent transition-all"
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                            <div className="relative group">
                                <Lock className="w-5 h-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-kerala-gold transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-kerala-gold/50 focus:border-transparent transition-all"
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center space-x-2 py-3 bg-kerala-gold hover:bg-white hover:text-kerala-green text-kerala-green font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8 text-white/40 text-xs">
                    &copy; {new Date().getFullYear()} Aravind Hotel. Secure Admin System.
                </div>
            </div>
        </div>
    );
}
