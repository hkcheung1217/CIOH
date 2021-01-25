import './OrderDetailsPage.css';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import visa from 'payment-icons/min/flat/visa.svg';
import { createOrderDetails } from '../../redux/actions/orderActions';
import Spinner from '../../components/Spinner/Spinner';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import CartItem from '../../components/CartItem/CartItem';
import PrevButton from '../../components/PrevButton/PrevButton';

const OrderDetailsPage = ({ match, history }) => {
	const dispatch = useDispatch();
	const id = match.params.id;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const orderDetails = useSelector(state => state.orderDetails);
	const {
		loading,
		error,
		order: { itemsPrice, taxPrice, totalPrice, orderItems, shippingAddress, user, createdAt },
	} = orderDetails;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		dispatch(createOrderDetails(id));
	}, [dispatch, history, id, userInfo]);

	const date = new Date(createdAt);
	const day = `${date.getDate()}`.padStart(2, 0);
	const month = date.getMonth();
	const year = date.getFullYear();
	const hour = date.getHours();
	const min = date.getMinutes();
	const monthName = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return loading ? (
		<Spinner />
	) : error ? (
		<AlertMessage title='error' text={error} />
	) : (
		<div className='orderDetailsPage'>
			<div className='orderDetailsPage__header'>
				<div className='orderDetailsPage__headerLeft'>
					<h1>Order Details</h1>
					<div className='orderDetailsPage__date'>
						<span>
							Ordered on {monthName[month]} {day}, {year} {hour}:{min} |{' '}
						</span>
						<span> Order #{id}</span>
					</div>
				</div>
				<div className='orderDetailsPage__headerRight'>
					<PrevButton orderDetails />
				</div>
			</div>
			<div className='orderDetailsPage__container'>
				<div className='orderDetailsPage__shippingAddress'>
					<h2>Shipping Address</h2>
					<span>{user?.name}</span>
					<span>{shippingAddress?.address}</span>
					<span>
						{shippingAddress?.city}, {shippingAddress?.postalCode}
					</span>
					<span>United States</span>
				</div>
				<div className='orderDetailsPage__paymentMethod'>
					<h2>Payment Method</h2>
					<span className='orderDetailPage__methodContainer'>
						<img className='orderDetailsPage__visaLogo' src={visa} alt='visa' /> <span>**** 4242</span>
					</span>
				</div>
				<div className='orderDetailsPage__summary'>
					<h2>Order Summary</h2>
					<span className='orderDetailsPage__summary__item'>
						<span>Item(s) Subtotal:</span>
						<span>${itemsPrice}</span>
					</span>
					<span className='orderDetailsPage__summary__item'>
						<span>Tax:</span>
						<span>${taxPrice}</span>
					</span>

					<span className='orderDetailsPage__summary__item'>
						<span>Total:</span>
						<span>${totalPrice}</span>
					</span>
				</div>
			</div>
			<div className='orderDetailsPage__itemsContainer'>
				{orderItems?.map(cartItem => (
					<CartItem key={cartItem.product} cartItem={cartItem} orderDetails />
				))}
			</div>
		</div>
	);
};

export default OrderDetailsPage;
