import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { MenuItem } from '@/models/Schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const query = categoryId ? { category: categoryId } : {};

    await dbConnect();
    try {
        const items = await MenuItem.find(query).populate('category');
        return NextResponse.json(items);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const body = await req.json();
        const menuItem = await MenuItem.create(body);
        return NextResponse.json(menuItem, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
    }
}
