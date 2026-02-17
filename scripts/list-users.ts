import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function listUsers() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        const UserSchema = new mongoose.Schema({
            email: String,
            role: String,
            name: String
        });
        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        const users = await User.find({});
        console.log('--- USERS ---');
        users.forEach(u => {
            console.log(`Email: ${u.email}, Role: ${u.role}, Name: ${u.name}`);
        });
        console.log('-------------');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

listUsers();
