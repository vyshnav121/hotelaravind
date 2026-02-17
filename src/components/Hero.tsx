"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-kerala-cream overflow-hidden pt-20">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-kerala-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-kerala-gold/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block py-1 px-3 border border-kerala-green/30 rounded-full text-kerala-green text-sm font-semibold tracking-wider uppercase mb-4 bg-white/50 backdrop-blur-sm">
                                Est. 1983 • Sulthan Bathery
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1]">
                                Authentic <br />
                                <span className="text-kerala-green">Kerala</span> Flavors
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                        >
                            Experience the rich culinary heritage of Malabar. From our legendary Biriyani to fresh seafood delicacies, every dish is a celebration of tradition and taste.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/menu" className="group px-8 py-4 bg-kerala-green text-white rounded-full font-medium shadow-lg hover:shadow-kerala-green/30 hover:-translate-y-1 transition-all flex items-center justify-center">
                                <span>Order Online</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/contact" className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-100 rounded-full font-medium hover:border-kerala-gold hover:text-kerala-green transition-all shadow-sm hover:shadow-md flex items-center justify-center">
                                Book a Table
                            </Link>
                        </motion.div>

                        {/* Stats/Social Proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex items-center justify-center lg:justify-start gap-8 pt-4"
                        >
                            <div>
                                <div className="flex text-kerala-gold mb-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-sm text-gray-500"><span className="font-bold text-gray-800">4.8/5</span> on Google Reviews</p>
                            </div>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <div>
                                <p className="font-serif font-bold text-2xl text-kerala-green">40+</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Years of Service</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative aspect-square w-full max-w-[600px] mx-auto">
                            {/* Golden Ring Decoration */}
                            <div className="absolute inset-0 rounded-full border border-kerala-gold/40 scale-105"></div>
                            <div className="absolute inset-0 rounded-full border border-dashed border-kerala-gold/30 animate-spin-slow scale-110"></div>

                            {/* Main Image Container - Masked as circle */}
                            <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-white z-10 bg-gray-200 group">
                                {/* Placeholder for Food Image - Ideally a top-down shot of a Sadya or Biriyani */}
                                <Image
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5aYFQwvg_u0lTO5VDxwsGxcoEkZ_N-crRMw&s"
                                    alt="Malabar Chicken Biriyani"
                                    fill
                                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                    unoptimized={true}
                                />

                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
