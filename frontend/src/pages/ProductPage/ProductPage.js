//css
import './ProductPage.css';
//libraries
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import Rating from '../../components/Rating/Rating';
import { Button } from '@material-ui/core';
import { listProductDetails } from '../../redux/actions/productActions';
import Spinner from '../../components/Spinner/Spinner';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import PrevButton from '../../components/PrevButton/PrevButton';

const ProductPage = ({ match, history }) => {
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	const productDetails = useSelector(state => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [match.params.id, dispatch]);

	const addItemToCart = () => {
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};

	return (
		<div className='productPage'>
			<PrevButton history={history} />
			{loading ? (
				<Spinner style={{ height: '60px', width: '60px' }} />
			) : error ? (
				<AlertMessage title='error' text={error} />
			) : (
				<div className='productPage__container'>
					<div className='productPage__image' style={{ backgroundImage: `url(${product.image})` }} />
					<div className='productPage__content'>
						<h2 className='productPage__name'>{product.name}</h2>
						<Rating
							className='productPage__rating'
							color='darkgoldenrod'
							value={product.rating}
							text={`${product.numReviews} reviews`}
						/>
						<p>{product.description}</p>
						<div className='productPage__status'>
							<label>Status:</label>
							<label>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</label>
						</div>
						<div className='productPage__price'>
							<label>Price:</label>
							<label>${product.price}</label>
						</div>
						<div className='productPage__quantity'>
							<label>Quantity:</label>
							<select
								disabled={product.countInStock === 0}
								className='productPage__selectQuantity'
								value={quantity}
								onChange={event => setQuantity(event.target.value)}
							>
								{[...Array(product.countInStock).keys()].map(num => (
									<option key={num + 1} value={num + 1}>
										{num + 1}
									</option>
								))}
							</select>
						</div>

						<Button
							className={`${product.countInStock === 0 ? '' : 'productPage__addItem'}`}
							disabled={product.countInStock === 0}
							onClick={addItemToCart}
						>
							Add Item to Cart
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
