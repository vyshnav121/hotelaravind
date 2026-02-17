"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, ChefHat, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { cartCount } = useCart();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Menu', href: '/menu' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userRole = (session?.user as any)?.role;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-kerala-green/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-kerala-gold text-kerala-green' : 'bg-white text-kerala-green'}`}>
                            <ChefHat className="w-6 h-6" />
                        </div>
                        <span className={`font-serif text-2xl font-bold transition-colors duration-300 ${scrolled ? 'text-white' : 'text-kerala-green'
                            }`}>
                            Aravind<span className="text-kerala-gold">Hotel</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-medium transition-colors duration-200 relative group ${scrolled ? 'text-white/90 hover:text-kerala-gold' : 'text-kerala-green hover:text-kerala-green-light'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-kerala-gold' : 'bg-kerala-green'
                                    }`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/cart" className={`relative transition-colors ${scrolled ? 'text-white hover:text-kerala-gold' : 'text-kerala-green hover:text-kerala-green-light'
                            }`}>
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {session?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className={`flex items-center gap-2 transition-colors ${scrolled ? 'text-white hover:text-kerala-gold' : 'text-kerala-green hover:text-kerala-green-light'}`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-kerala-gold/20 flex items-center justify-center border border-kerala-gold">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm max-w-[100px] truncate">{session.user.name?.split(' ')[0]}</span>
                                </button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 border border-gray-100 overflow-hidden"
                                            onMouseLeave={() => setUserMenuOpen(false)}
                                        >
                                            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                                                <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                            </div>

                                            <Link
                                                href="/orders"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-kerala-green transition-colors"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <Package className="w-4 h-4" />
                                                My Orders
                                            </Link>

                                            {userRole === 'admin' && (
                                                <Link
                                                    href="/admin/dashboard"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-kerala-green transition-colors"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    Admin Dashboard
                                                </Link>
                                            )}

                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login" className={`px-4 py-1.5 rounded-full border transition-all ${scrolled
                                ? 'border-kerala-gold text-kerala-gold hover:bg-kerala-gold hover:text-kerala-green'
                                : 'border-kerala-green text-kerala-green hover:bg-kerala-green hover:text-white'
                                } text-sm font-medium`}>
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/cart" className={`relative transition-colors ${scrolled ? 'text-white' : 'text-kerala-green'
                            }`}>
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={toggleMenu}
                            className={`focus:outline-none transition-colors ${scrolled ? 'text-white hover:text-kerala-gold' : 'text-kerala-green'
                                }`}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-kerala-green border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-3 rounded-lg text-base font-medium text-white hover:text-kerala-green hover:bg-kerala-gold transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {session?.user ? (
                                <>
                                    <div className="px-3 py-2 text-kerala-gold text-sm font-semibold border-t border-white/10 mt-2 pt-4">
                                        Signed in as {session.user.name}
                                    </div>
                                    {userRole === 'admin' && (
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="block px-3 py-3 rounded-lg text-base font-medium text-white hover:text-kerala-green hover:bg-kerala-gold transition-colors"
                                        >
                                            <LayoutDashboard className="w-4 h-4 inline mr-2" />
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="w-full text-left block px-3 py-3 rounded-lg text-base font-medium text-red-300 hover:text-white hover:bg-red-500/20 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 inline mr-2" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-3 rounded-lg text-base font-medium text-white hover:text-kerala-green hover:bg-kerala-gold transition-colors"
                                >
                                    Sign In / Sign Up
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
