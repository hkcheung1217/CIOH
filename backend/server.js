const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const colors = require('colors');
const path = require('path');

//routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
//middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'frontend/build')));

	app.use('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
	});
} else {
	app.use('/', (req, res) => {
		res.send('API is running...');
	});
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(5000, console.log(`server is running in ${process.env.NODE_ENV} on ${PORT}`.green.bold));
