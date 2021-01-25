import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import ReactLogo from '../../assets/logo1.png';
import { createOrder } from '../../redux/actions/orderActions';

const StripeButton = ({ price, userInfo, cartItems, taxAmount, itemsAmount }) => {
	const dispatch = useDispatch();

	const priceForStripe = (price * 100).toFixed(2) * 1;
	const publishableKey =
		'pk_test_51HGwC8FIYvhOBO6LcSkAQ4DWeUiR1OjX7pZsAQG3CrBVgW9CpDRbNDUwO0omql8bE8kvw1RE5MjD21y6HyPusE5p000XdcWufL';
	const onToken = (token, args) => {
		const shippingAddress = {
			address: args.shipping_address_line1,
			city: args.shipping_address_city,
			postalCode: args.shipping_address_zip,
			country: args.shipping_address_country_code,
		};

		axios
			.post('api/orders/payment', { amount: priceForStripe, token, metadata: args })
			.then(res =>
				dispatch(
					createOrder({
						orderItems: cartItems,
						shippingAddress: shippingAddress,
						paymentMethod: token.card.brand,
						itemsPrice: itemsAmount,
						taxPrice: taxAmount,
						totalPrice: price,
					})
				)
			)
			.catch(err => alert(err));
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='CIOH Ltd.'
			shippingAddress
			billingAddress
			image={ReactLogo}
			email={userInfo?.email}
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeButton;
