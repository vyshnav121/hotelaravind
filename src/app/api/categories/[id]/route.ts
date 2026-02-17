import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Category, MenuItem } from '@/models/Schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(`>>> [CATEGORY DELETE] RECEIVED REQUEST FOR ID: ${id}`);

    const session = await getServerSession(authOptions);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any).role !== 'admin') {
        if (!session) {
            console.log(`>>> [CATEGORY DELETE] UNAUTHORIZED: NO SESSION`);
        } else {
            console.log(`>>> [CATEGORY DELETE] UNAUTHORIZED: USER IS NOT ADMIN. Role: ${(session.user as any).role}`);
        }
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`>>> [CATEGORY DELETE] SESSION USER:`, session.user);

    await dbConnect();
    console.log(`>>> [CATEGORY DELETE] DB CONNECTED`);

    try {
        // Check if category has menu items
        const hasMenuItems = await MenuItem.findOne({ category: id });
        if (hasMenuItems) {
            console.log(`>>> [CATEGORY DELETE] ABORTING: CATEGORY HAS MENU ITEMS`);
            return NextResponse.json({
                error: 'Cannot delete category that contains menu items'
            }, { status: 400 });
        }

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            console.log(`>>> [CATEGORY DELETE] CATEGORY NOT FOUND IN DB: ${id}`);
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        console.log(`>>> [CATEGORY DELETE] SUCCESSFUL`);
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(">>> [CATEGORY DELETE] INTERNAL ERROR:", error);
        return NextResponse.json({ error: 'Failed to delete category', details: (error as Error).message }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    try {
        const body = await req.json();
        const category = await Category.findByIdAndUpdate(id, body, { new: true });
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json(category);
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}
