"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, LogOut, Settings, Menu as MenuIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated' && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [status, router, pathname]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-kerala-bean">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kerala-green"></div>
            </div>
        );
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Categories', href: '/admin/categories', icon: MenuIcon },
        { name: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-kerala-sand font-sans">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex w-72 flex-col bg-kerala-green text-white shadow-2xl z-20">
                <div className="h-24 flex items-center justify-center border-b border-white/10">
                    <h1 className="font-serif text-2xl font-bold text-kerala-gold tracking-wide">Aravind Hotel</h1>
                </div>

                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-8 p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full bg-kerala-gold flex items-center justify-center text-kerala-green font-bold text-lg shadow-inner">
                            {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium text-sm text-white truncate">{session?.user?.name || 'Admin'}</p>
                            <p className="text-xs text-white/60 truncate">Administrator</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-kerala-gold text-kerala-green shadow-lg font-medium transform scale-[1.02]'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-kerala-green' : 'text-kerala-gold'}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/10">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center space-x-3 text-white/70 hover:text-red-400 w-full px-4 py-3 rounded-xl transition-colors hover:bg-white/5"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-kerala-green text-white z-50 h-16 flex items-center justify-between px-4 shadow-md">
                <h1 className="font-serif text-lg font-bold text-kerala-gold">Aravind Hotel</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-64 h-full bg-kerala-green p-4 overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-center h-16 mb-6 border-b border-white/10">
                            <h1 className="font-serif text-xl font-bold text-kerala-gold">Menu</h1>
                        </div>
                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${pathname === item.href ? 'bg-kerala-gold text-kerala-green font-medium' : 'text-white/80'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="flex items-center space-x-3 text-white/70 hover:text-red-400 w-full px-4 py-3 rounded-xl mt-4"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Sign Out</span>
                            </button>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen md:pt-0 pt-16">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
