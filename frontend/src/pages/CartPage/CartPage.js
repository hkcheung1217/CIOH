import './CartPage.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

import AlertMessage from '../../components/AlertMessage/AlertMessage';
import PrevButton from '../../components/PrevButton/PrevButton';
import CartItem from '../../components/CartItem/CartItem';
import StripeButton from '../../components/StripeButton/StripeButton';
import Spinner from '../../components/Spinner/Spinner';
import { Button } from '@material-ui/core';
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstant';

const CartPage = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const { cartItems } = cart;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const orderCreate = useSelector(state => state.orderCreate);
	const { loading, success, error, order } = orderCreate;

	const id = match.params.id;
	const quantity = Number(location.search.split('=')[1]) || 1;

	const totalItemNum = cartItems.reduce((acc, curr) => curr.qty + acc, 0);
	const itemsAmount = cartItems.reduce((acc, curr) => curr.price * curr.qty + acc, 0);
	const taxAmount = itemsAmount * 0.0725;
	const totalAmount = itemsAmount + taxAmount;

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, quantity));
		}
	}, [dispatch, id, quantity]);

	useEffect(() => {
		if (success) {
			history.push(`/orders/${order?._id}`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [dispatch, success, history, order]);

	return (
		<div className='cartPage'>
			<PrevButton history={history} />
			<h2>Shopping Cart</h2>
			{loading ? (
				<Spinner />
			) : error ? (
				<AlertMessage title='error' text={error} />
			) : cartItems.length === 0 ? (
				<AlertMessage title='info' text='Your cart is empty 🛒' />
			) : (
				<>
					<div className='cartPage__itemsContainer'>
						{cartItems.map(cartItem => (
							<CartItem key={cartItem.product} cartItem={cartItem} />
						))}
						<div className='cartPage__footer'>
							<div className='cartPage__price'>
								<span className='cartPage__price__subtotal'>
									<span>
										Subtotal ({totalItemNum}){totalItemNum === 1 ? ' item: ' : ' items: '}
									</span>
									<span>${itemsAmount.toFixed(2)}</span>
								</span>
								<span className='cartPage__price__tax'>
									<span>Tax:</span>
									<span>${taxAmount.toFixed(2)}</span>
								</span>

								<span className='cartPage__price__total'>
									<span>Total:</span>
									<span>${totalAmount.toFixed(2)}</span>
								</span>
							</div>

							{!userInfo ? (
								<Button onClick={() => history.push('/login')} className='cartPage__checkoutSignIn'>
									Login for Checkout
								</Button>
							) : (
								<StripeButton
									price={totalAmount.toFixed(2) * 1}
									taxAmount={taxAmount.toFixed(2) * 1}
									itemsAmount={itemsAmount.toFixed(2) * 1}
									userInfo={userInfo}
									cartItems={cartItems}
								/>
							)}
						</div>
						<div className='cartPage__note'>
							<AlertMessage
								title='info'
								customTitle='Test Card Info'
								text='4242 4242 4242 4242 Exp: 01/21 CVV: 123'
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CartPage;
