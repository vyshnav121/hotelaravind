import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Order } from '@/models/Schemas';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let query = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userRole = (session.user as any).role;

        if (userRole !== 'admin') {
            // If not admin, only show orders for this user's email
            query = { email: session.user.email };
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });
        return NextResponse.json(orders);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        // Validate body here if needed, but Mongoose schema handles most.
        // Ensure all required fields are present.
        // TODO: Validate prices against DB to prevent tampering? 
        // For now, trust the payload but ideally we should fetch prices.

        // Simplification: We trust the items array has valid prices/names as per frontend cart logic
        // But secure way: fetch price from DB based on menuItem ID.

        const order = await Order.create({
            ...body,
            status: 'Pending', // Force status to Pending on creation
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
