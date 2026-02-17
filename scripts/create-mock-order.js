const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const OrderSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    email: String,
    address: String,
    items: Array,
    totalAmount: Number,
    paymentMethod: String,
    status: { type: String, default: 'Pending' },
    location: {
        lat: Number,
        lng: Number
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

async function createMockOrder() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Coordinates for Kochi, Kerala (approx)
        const mockLocation = {
            lat: 9.9312,
            lng: 76.2673
        };

        const order = await Order.create({
            customerName: "Test User Location",
            phone: "9876543210",
            email: "testlocation@example.com",
            address: "Marine Drive, Kochi, Kerala",
            items: [
                { name: "Kerala Fish Curry", quantity: 1, price: 350 },
                { name: "Porotta", quantity: 2, price: 15 }
            ],
            totalAmount: 380,
            paymentMethod: "COD",
            status: "Pending",
            location: mockLocation
        });

        console.log(`Created mock order with ID: ${order._id}`);
        console.log(`Location: ${mockLocation.lat}, ${mockLocation.lng}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createMockOrder();
