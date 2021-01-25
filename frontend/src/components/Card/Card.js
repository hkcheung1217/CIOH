//css
import './Card.css';
//react libraries
import React from 'react';
import { withRouter } from 'react-router-dom';
//components
import Rating from '../Rating/Rating';

const Card = ({ id, name, image, price, rating, match, history }) => {
	return (
		<div className='card'>
			<div
				className='card__image'
				style={{ backgroundImage: `url(${image})` }}
				onClick={() => history.push(`${match.url}products/${id}`)}
			/>
			<div className='card__content'>
				<h2 className='card__name' onClick={() => history.push(`${match.url}products/${id}`)}>
					{name}
				</h2>
				<div className='card__footer'>
					<p className='card__price'>${price}</p>
					<Rating value={rating} color='darkgoldenrod' />
				</div>
			</div>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825',
};

export default withRouter(Card);
