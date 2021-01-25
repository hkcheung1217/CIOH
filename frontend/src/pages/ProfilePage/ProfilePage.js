import './ProfilePage.css';
import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import FormInput from '../../components/FormInput/FormInput';
import OrderListItem from '../../components/OrderListItem/OrderListItem';
//redux

import Spinner from '../../components/Spinner/Spinner';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../redux/actions/userActions';
import { listOrders } from '../../redux/actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstant';

const ProfilePage = ({ history }) => {
	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector(state => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderList = useSelector(state => state.orderList);
	const { loading: loadingOrder, error: errorOrder, orders } = orderList;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetails('profile'));
				dispatch(listOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user, success]);

	const handleSubmit = event => {
		event.preventDefault();

		setPasswordMessage('');

		setName(name.trim());
		setEmail(email.trim().toLowerCase());

		if (password !== confirmPassword) {
			setPasswordMessage('Passwords do not match');
		} else {
			dispatch(
				updateUserProfile({ id: user._id, name: name.trim(), email: email.trim().toLowerCase(), password })
			);
		}
	};

	return loading ? (
		<Spinner />
	) : (
		<div className='profilePage'>
			<div className='profilePage__container'>
				<div className='profilePage__leftContainer'>
					<div className='profilePage__title'>
						<h2>User Profile</h2>
					</div>
					{error && <AlertMessage title='error' text={error} />}
					{success && <AlertMessage title='success' text={'Profile Updated'} />}
					{passwordMessage && <AlertMessage title='warning' text={passwordMessage} />}
					<form onSubmit={handleSubmit}>
						<FormInput
							userName={user?.name}
							name='name'
							type='text'
							handleChange={event => setName(event.target.value)}
							value={name}
							label='name'
						/>
						<FormInput
							userEmail={user?.email}
							name='email'
							type='email'
							handleChange={event => setEmail(event.target.value)}
							value={email}
							label='email'
						/>
						<FormInput
							name='password'
							type='password'
							handleChange={event => setPassword(event.target.value)}
							value={password}
							label='password'
						/>
						<FormInput
							name='confirmPassword'
							type='password'
							handleChange={event => setConfirmPassword(event.target.value)}
							value={confirmPassword}
							label='confirm password'
						/>
						<div className='buttons'>
							<Button className='profilePage__update' type='submit'>
								Update
							</Button>
						</div>
					</form>
				</div>
				<div className='profilePage__rightContainer'>
					<h2>Order</h2>
					{loadingOrder ? (
						<Spinner />
					) : errorOrder ? (
						<AlertMessage title='error' text={errorOrder} />
					) : (
						orders.map(order => (
							<OrderListItem
								key={order._id}
								id={order._id}
								createdAt={order.createdAt}
								totalPrice={order.totalPrice}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
