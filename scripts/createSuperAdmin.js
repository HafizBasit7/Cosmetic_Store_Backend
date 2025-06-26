const mongoose = require('mongoose');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb+srv://tahir:112233test@auctionplatform.veyca.mongodb.net/cosmeticAdmin')
  .then(async () => {
    const hashed = await bcrypt.hash('superadmin123', 10);
    await Admin.updateOne(
      { email: 'super@admin.com' },
      { name: 'Super Admin', email: 'super@admin.com', password: hashed, role: 'superadmin' },
      { upsert: true }
    );
    console.log('✅ Super Admin Created');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));