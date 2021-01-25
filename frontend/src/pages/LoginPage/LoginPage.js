import './LoginPage.css';

import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import FormInput from '../../components/FormInput/FormInput';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import Spinner from '../../components/Spinner/Spinner';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const LoginPage = ({ history, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const userLogin = useSelector(state => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const handleSubmit = event => {
		event.preventDefault();

		dispatch(login(email, password));
	};
	return loading ? (
		<Spinner />
	) : (
		<div className='loginPage'>
			<div className='loginPage__container'>
				<div className='loginPage__title'>
					<h2>Sign in with your email and password</h2>
				</div>
				{error && <AlertMessage title='error' text={error} />}
				<form onSubmit={handleSubmit}>
					<FormInput
						name='email'
						type='email'
						handleChange={event => setEmail(event.target.value)}
						value={email}
						label='email'
						required
					/>
					<FormInput
						name='password'
						type='password'
						handleChange={event => setPassword(event.target.value)}
						value={password}
						label='password'
						required
					/>
					<div className='buttons'>
						<Button className='loginPage__login' type='submit'>
							Sign in
						</Button>
					</div>
					<div className='loginPage__signup'>
						<span>
							New Customer?{'  '}
							<span className='loginPage__signupPointer' onClick={() => history.push('/register')}>
								Register Here
							</span>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
