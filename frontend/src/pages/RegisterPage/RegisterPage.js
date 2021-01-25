import './RegisterPage.css';

import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import FormInput from '../../components/FormInput/FormInput';

//redux

import Spinner from '../../components/Spinner/Spinner';
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';

const RegisterPage = ({ history, location }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMessage, setPasswordMessage] = useState('');

	const dispatch = useDispatch();

	const userRegister = useSelector(state => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const handleSubmit = event => {
		event.preventDefault();

		setPasswordMessage('');

		if (password === confirmPassword) {
			dispatch(register(name, email, password));
		} else {
			setPasswordMessage('Passwords do not match');
		}
	};

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	return loading ? (
		<Spinner />
	) : (
		<div className='registerPage'>
			<div className='registerPage__container'>
				<div className='registerPage__title'>
					<h2>Sign Up</h2>
				</div>
				{error && <AlertMessage title='error' text={error} />}
				{passwordMessage && <AlertMessage title='warning' text={passwordMessage} />}
				<form onSubmit={handleSubmit}>
					<FormInput
						name='name'
						type='text'
						handleChange={event => setName(event.target.value)}
						value={name}
						label='name'
						required
					/>
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
					<FormInput
						name='confirmPassword'
						type='password'
						handleChange={event => setConfirmPassword(event.target.value)}
						value={confirmPassword}
						label='confirm password'
						required
					/>
					<div className='buttons'>
						<Button className='registerPage__register' type='submit'>
							Register
						</Button>
					</div>
					<div className='registerPage__login'>
						<span>
							Already have an account?{'  '}
							<span className='registerPage__loginPointer' onClick={() => history.push('/login')}>
								Sign In Here
							</span>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
