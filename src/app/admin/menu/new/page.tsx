"use client";

import { useEffect, useState } from 'react';
import MenuItemForm from '@/components/MenuItemForm';

export default function NewMenuItemPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800 mb-6">Add New Menu Item</h1>
            <MenuItemForm categories={categories} />
        </div>
    );
}
