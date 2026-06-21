// Run with: npm run seed:admin
// Creates (or updates) a single admin account using ADMIN_EMAIL / ADMIN_PASSWORD from .env
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
      process.exit(1);
    }

    let admin = await User.findOne({ email });

    if (admin) {
      admin.role = 'admin';
      admin.password = password; // will be re-hashed by the pre-save hook
      await admin.save();
      console.log(`Existing user updated to admin: ${email}`);
    } else {
      admin = await User.create({
        name: 'Admin',
        email,
        password,
        role: 'admin',
      });
      console.log(`Admin account created: ${email}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
