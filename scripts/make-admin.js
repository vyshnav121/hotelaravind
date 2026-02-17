
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function makeAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Define a minimal User schema/model
        const UserSchema = new mongoose.Schema({
            email: String,
            role: String
        });

        // Check if model already exists or create it
        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        const email = 'vyshnav@gmail.com';
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
