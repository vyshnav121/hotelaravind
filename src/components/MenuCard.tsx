"use client";

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    isVeg: boolean;
}

export default function MenuCard({ id, name, description, price, image, isVeg }: MenuItemProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ id, name, price, image });
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
        >
            <div className="relative h-48 w-full bg-gray-200">
                {image ? (
                    <Image src={image} alt={name} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isVeg ? 'VEG' : 'NON-VEG'}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-serif font-bold text-lg text-gray-800">{name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-kerala-green font-bold text-xl">₹{price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="w-10 h-10 rounded-full bg-kerala-gold text-white flex items-center justify-center hover:bg-kerala-green transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
