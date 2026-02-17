"use client";

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-kerala-cream pt-20 pb-24">
            {/* Header */}
            <div className="bg-kerala-green text-white py-20 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-kerala-gold/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <span className="text-kerala-gold font-serif text-lg italic mb-2 block">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Contact Us</h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our menu, need to book a table, or just want to say hello.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Visit Us</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Located in the heart of Sulthan Bathery, Aravind Hotel is easily accessible. Join us for a meal that celebrates the true spirit of Wayanad.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-kerala-gold/10 text-kerala-green rounded-full">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                                        <p className="text-gray-600">Main Road, <br />Sulthan Bathery, Wayanad, Kerala 673592</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-kerala-gold/10 text-kerala-green rounded-full">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600 text-lg font-medium">+91 75111 11033</p>
                                        <p className="text-gray-500 text-sm">Mon-Sun 11am to 11pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-kerala-gold/10 text-kerala-green rounded-full">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">hotelaravind16@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <Clock className="w-6 h-6 text-kerala-gold" />
                                <h3 className="text-xl font-serif font-bold text-gray-900">Opening Hours</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-600">Monday - Sunday</span>
                                    <span className="font-medium text-gray-900">11:00 AM - 11:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kerala-green to-kerala-gold"></div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Send a Message</h2>
                        <p className="text-gray-500 mb-8">Have a query? Fill out the form below.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all"
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all"
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kerala-green/20 focus:border-kerala-green outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-kerala-green text-white font-bold rounded-xl shadow-lg hover:bg-kerala-green-light hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4 ml-1" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
