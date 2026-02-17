import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Order, User } from '@/models/Schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionUser = session.user as any;

    console.log(`[ORDER PATCH] Session User:`, JSON.stringify(sessionUser, null, 2));

    // Check if role is in session, if not fetch from DB
    let userRole = sessionUser.role;
    console.log(`[ORDER PATCH] Initial Role from Session:`, userRole);

    if (!userRole) {
        console.log(`[ORDER PATCH] Role missing in session, fetching from DB for email:`, sessionUser.email);
        if (sessionUser.email) {
            const dbUser = await User.findOne({ email: sessionUser.email });
            if (dbUser) {
                console.log(`[ORDER PATCH] User found in DB. Role:`, dbUser.role);
                userRole = dbUser.role;
            } else {
                console.log(`[ORDER PATCH] User not found in DB`);
            }
        }
    }

    console.log(`[ORDER PATCH] Final Resolved Role:`, userRole);

    if (userRole !== 'admin') {
        console.error(`[ORDER PATCH] ACCESS DENIED. Role 'admin' required.`);
        return NextResponse.json({ error: 'Unauthorized', debug_role: userRole }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { status } = body;

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        console.error("Order update error:", error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any).role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    try {
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}
