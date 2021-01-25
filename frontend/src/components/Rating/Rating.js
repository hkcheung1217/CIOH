import React from 'react';

import './Rating.css';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const Rating = ({ value, text, color }) => {
	return (
		<div className='rating'>
			<span className='rating__star' style={{ color: color }}>
				{value >= 1 ? <StarIcon /> : value >= 0.5 ? <StarHalfIcon /> : <StarBorderIcon />}
			</span>
			<span className='rating__star' style={{ color: color }}>
				{value >= 2 ? <StarIcon /> : value >= 1.5 ? <StarHalfIcon /> : <StarBorderIcon />}
			</span>
			<span className='rating__star' style={{ color: color }}>
				{value >= 3 ? <StarIcon /> : value >= 2.5 ? <StarHalfIcon /> : <StarBorderIcon />}
			</span>
			<span className='rating__star' style={{ color: color }}>
				{value >= 4 ? <StarIcon /> : value >= 3.5 ? <StarHalfIcon /> : <StarBorderIcon />}
			</span>
			<span className='rating__star' style={{ color: color }}>
				{value >= 5 ? <StarIcon /> : value >= 4.5 ? <StarHalfIcon /> : <StarBorderIcon />}
			</span>
			<span style={{ color: color }}>{text && text}</span>
		</div>
	);
};

export default Rating;
