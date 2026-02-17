const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const OrderSchema = new mongoose.Schema({
    customerName: String,
    location: {
        lat: Number,
        lng: Number
    },
    createdAt: Date
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

async function checkOrders() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const ordersWithLocation = await Order.find({
            'location.lat': { $exists: true, $ne: null }
        }).limit(5);

        console.log(`Found ${ordersWithLocation.length} orders with location data.`);
        ordersWithLocation.forEach(o => {
            console.log(`- Order ${o._id}: ${o.customerName} (${o.location.lat}, ${o.location.lng})`);
        });

        const totalOrders = await Order.countDocuments();
        console.log(`Total orders: ${totalOrders}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkOrders();
