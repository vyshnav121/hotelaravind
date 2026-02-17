import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ChefHat } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-kerala-green text-white pt-16 pb-8 border-t border-kerala-green-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="p-1.5 bg-kerala-gold rounded-full text-kerala-green">
                                <ChefHat className="w-5 h-5" />
                            </div>
                            <span className="font-serif text-2xl font-bold text-white">
                                Aravind<span className="text-kerala-gold">Hotel</span>
                            </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Serving authentic flavors and building culinary memories in Sulthan Bathery since 1983. A tradition of taste, quality, and hospitality.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kerala-gold hover:text-kerala-green transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/aravindrestaurant_catering?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kerala-gold hover:text-kerala-green transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-kerala-gold hover:text-kerala-green transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-bold text-kerala-gold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/menu" className="text-gray-300 hover:text-white transition-colors">Menu</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h4 className="font-serif text-lg font-bold text-kerala-gold mb-6">Opening Hours</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex justify-between">
                                <span>Mon - Fri:</span>
                                <span>11:00 AM - 11:00 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-lg font-bold text-kerala-gold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-kerala-gold shrink-0" />
                                <span>Main Road,    <br />Sulthan Bathery, Wayanad</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-kerala-gold shrink-0" />
                                <span>+91 75111 11033</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-kerala-gold shrink-0" />
                                <span>hotelaravind16@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Aravind Hotel. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
