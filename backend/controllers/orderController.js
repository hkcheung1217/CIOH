const stripe = require('stripe')(
	'sk_test_51HGwC8FIYvhOBO6L9pohczZVtOfKoVyCAQcozTGdpYZ6FKWVy3qbHtQPBYemCrrjVrFkD6BdjD5ICSN893VQ6JPv00Jec2vcjn'
);
const asyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @desc    Get order by ID
// @route   Get /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Get logged in user orders
// @route   Get /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
const makePayment = async (req, res) => {
	const body = {
		source: req.body.token.id,
		amount: req.body.amount,
		currency: 'usd',
	};
	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).send({ error: stripeErr });
		} else {
			res.status(200).send({ success: stripeRes });
		}
	});
};

module.exports = { makePayment, addOrderItems, getOrderById, getMyOrders };
