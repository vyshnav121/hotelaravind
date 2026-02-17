
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function makeAdmin() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        // Define a minimal User schema/model if not importing to avoid issues
        const UserSchema = new mongoose.Schema({
            email: String,
            role: String
        });
        // check if model already exists to avoid overwrite error if using ts-node with imports
        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        const email = 'vyshnav@gmail.com'; // The email from the logs
        const result = await User.findOneAndUpdate(
            { email: email },
            { $set: { role: 'admin' } },
            { new: true }
        );

        if (result) {
            console.log(`Successfully promoted ${email} to admin.`);
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

makeAdmin();
