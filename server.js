const express = require('express');
const app = express();
const sequelize = require('./config/database');
require('dotenv').config();

// Middleware
app.use(express.json());

// Route Imports
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const reviewRoutes = require('./routes/review');  // Ensure this is imported
const adminRoutes = require('./routes/admin');

// Route Registrations
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);  // Ensure this is registered
app.use('/api/admin', adminRoutes);


sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
