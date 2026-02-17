import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function revertToUser() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        const UserSchema = new mongoose.Schema({
            email: String,
            role: String
        });
        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        const email = 'vyshnav@gmail.com';
        const result = await User.findOneAndUpdate(
            { email: email },
            { $set: { role: 'user' } },
            { new: true }
        );

        if (result) {
            console.log(`Successfully reverted ${email} to user.`);
            console.log('New role:', result.role);
        } else {
            console.log(`User with email ${email} not found.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

revertToUser();
