import { Schema, model, models } from 'mongoose';

// User Schema (Admin)
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: 'admin' },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);

// Category Schema
const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const Category = models.Category || model('Category', CategorySchema);

// MenuItem Schema
const MenuItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    isVeg: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
}, { timestamps: true });

export const MenuItem = models.MenuItem || model('MenuItem', MenuItemSchema);

// Order Schema
const OrderSchema = new Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    items: [{
        menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // Store price at time of order
        name: { type: String } // Store name at time of order
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: { type: String, enum: ['COD', 'Online'], default: 'COD' },
    paymentId: { type: String }, // Razorpay Payment ID
    orderId: { type: String }, // Razorpay Order ID for verification
    location: {
        lat: { type: Number },
        lng: { type: Number }
    }
}, { timestamps: true });

export const Order = models.Order || model('Order', OrderSchema);
