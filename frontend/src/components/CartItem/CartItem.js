import './CartItem.css';
import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
//react
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

const CartItem = ({ orderDetails, cartItem: { product, name, qty, price, image, countInStock } }) => {
	const dispatch = useDispatch();

	const removeFromCartHandler = id => {
		dispatch(removeFromCart(id));
	};

	return (
		<div className='cartItem'>
			<div className='cartItem__image'>
				<img src={image} alt='item' />
			</div>
			<span className='cartItem__name'>{name}</span>
			<span className='cartItem__quantity'>
				{orderDetails ? (
					<span>{qty}</span>
				) : (
					<select value={qty} onChange={event => dispatch(addToCart(product, Number(event.target.value)))}>
						{[...Array(countInStock).keys()].map(num => (
							<option key={num + 1}>{num + 1}</option>
						))}
					</select>
				)}
			</span>
			<span className='cartItem__price'>${price}</span>
			<div hidden={orderDetails} className='cartItem__remove'>
				<IconButton onClick={() => removeFromCartHandler(product)}>
					<DeleteIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default CartItem;
