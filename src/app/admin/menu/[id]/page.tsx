"use client";

import { useEffect, useState } from 'react';
import { use } from 'react';
import MenuItemForm from '@/components/MenuItemForm';

export default function EditMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [categories, setCategories] = useState([]);
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));

        fetch(`/api/menu-items/${id}`)
            .then(res => res.json())
            .then(data => setItem(data));
    }, [id]);

    if (!item) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-serif font-bold text-gray-800 mb-6">Edit Menu Item</h1>
            <MenuItemForm categories={categories} initialData={item} />
        </div>
    );
}
