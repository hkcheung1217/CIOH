import './OrderListItem.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const OrderListItem = ({ id, createdAt, totalPrice }) => {
	const history = useHistory();
	return (
		<div className='orderListItem'>
			<span className='orderListItem__id'>{id}</span>
			<span className='orderListItem__createdAt'>{createdAt.substring(0, 10)}</span>
			<span className='orderListItem__total'>${totalPrice}</span>

			<Button className='orderListItem__details' onClick={() => history.push(`/orders/${id}`)}>
				Details
			</Button>
		</div>
	);
};

export default OrderListItem;
