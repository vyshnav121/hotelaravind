import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { Order } from '@/models/Schemas';

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await dbConnect();

            const order = await Order.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    paymentId: razorpay_payment_id,
                    status: 'Confirmed'
                },
                { new: true }
            );

            if (!order) {
                return NextResponse.json({ error: 'Order not found' }, { status: 404 });
            }

            return NextResponse.json({ success: true, order });
        } else {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }
    } catch {
        return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
    }
}
