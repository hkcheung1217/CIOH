import './PrevButton.css';
import { Button } from '@material-ui/core';
import React from 'react';

import { useHistory } from 'react-router-dom';

const PrevButton = ({ orderDetails }) => {
	const history = useHistory();

	const handleClick = () => {
		if (orderDetails) {
			history.push('/profile');
		} else {
			history.push('/');
		}
	};

	return (
		<div className='prevButton__container'>
			<Button className='prevButton__button' onClick={handleClick}>
				Prev
			</Button>
		</div>
	);
};

export default PrevButton;
