import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models/Schemas';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // Create new user (Role: user)
        // TODO: Implement password hashing (e.g., bcrypt)
        const newUser = await User.create({
            name,
            email,
            password,
            role: 'user'
        });

        return NextResponse.json({ message: 'User created successfully', userId: newUser._id }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
