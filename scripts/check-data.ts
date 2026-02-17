import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function checkData() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        const CategorySchema = new mongoose.Schema({ name: String });
        const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

        const MenuItemSchema = new mongoose.Schema({ name: String, category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } });
        const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);

        const categories = await Category.find({});
        console.log('--- Categories ---');
        categories.forEach(c => console.log(`ID: ${c._id}, Name: "${c.name}"`));

        const menuItems = await MenuItem.find({}).populate('category');
        console.log('\n--- Menu Items ---');
        menuItems.forEach(m => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const catName = (m.category as any)?.name || 'Unknown';
            console.log(`Item: "${m.name}", Category: "${catName}"`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

checkData();
