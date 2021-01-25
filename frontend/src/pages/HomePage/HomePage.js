//css
import './HomePage.css';
//libraries
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../redux/actions/productActions';
//components
import Card from '../../components/Card/Card';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import Spinner from '../../components/Spinner/Spinner';

const HomePage = () => {
	const dispatch = useDispatch();

	const productList = useSelector(state => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div className='homepage'>
			{loading ? (
				<Spinner style={{ height: '60px', width: '60px' }} />
			) : error ? (
				<AlertMessage title='error' text={error} />
			) : (
				<div className='homepage__container'>
					{products.map(({ _id, ...otherProductProps }) => (
						<Card key={_id} id={_id} {...otherProductProps} />
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;
