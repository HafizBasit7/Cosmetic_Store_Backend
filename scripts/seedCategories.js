const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

const categories = [
  { name: 'Clothes' },
  { name: 'Lipstick' },
  { name: 'Perfume' },
  { name: 'Skincare' },
];

mongoose.connect('mongodb+srv://tahir:112233test@auctionplatform.veyca.mongodb.net/cosmeticAdmin')
  .then(async () => {
    for (const cat of categories) {
      await Category.updateOne(
        { name: cat.name },
        { $set: cat },
        { upsert: true }
      );
    }
    console.log('✅ Categories Seeded');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Seeder Error:', err));
